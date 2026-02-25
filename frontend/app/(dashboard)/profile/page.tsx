"use client";

import { useState, useEffect } from "react";
import { getMyProfile, upsertMyProfile, ProfilePayload } from "../../services/profile.service";
import {
  Camera,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  X,
  Edit2,
  Save,
  FileText,
  Upload,
  Link as LinkIcon,
  Calendar,
  Building2,
} from "lucide-react";
import axios from "axios";


/* ================= TYPES ================= */

interface WorkExperience {
  _id?: string;
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string; // Will store "YYYY-MM"
  endDate: string;   // Will store "YYYY-MM" or ""
  isCurrent: boolean; // NEW: To handle "Present"
  description: string;
}


interface Education {
  id: string;
  degree: string;
  institution: string;
  description: string;
}

/* ================= COMPONENT ================= */

export default function ProfilePage() {
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newPortfolioLink, setNewPortfolioLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [existingResume, setExistingResume] = useState<{ name: string, id: string } | null>(null);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);

  const [basicInfo, setBasicInfo] = useState({
    name: "",
    title: "",
    location: "",
    email: "",
    phone: "",
    bio: "",
  });


  const [skills, setSkills] = useState<string[]>([]);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [portfolioLinks, setPortfolioLinks] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getMyProfile();
        if (data) {
          // Fill Basic Info
          setBasicInfo({
            name: data.name || "",
            title: data.title || "",
            location: data.location || "",
            email: data.email || "",
            phone: data.phone || "",
            bio: data.bio || "",
          });

          // Fill Arrays
          setSkills(data.skills || []);
          setWorkExperience(data.workExperience || []);
          setEducation(data.education || []);
          setPortfolioLinks(data.portfolioLinks || []);
          setEducation(data.education || []);
          setPortfolioLinks(data.portfolioLinks || []);

          // === NEW: Handle Resume Fill ===
          if (data.resumeUploaded && data.resumeFilename) {
            setExistingResume({
              name: data.resumeFilename,
              id: data.resumeFileId,
            });
          }
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.log("No profile found. Starting with a fresh one.");
        } else {
          console.error("Profile fetch error:", error);
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  /* ================= HANDLERS ================= */

  const handleAddSkill = () => {
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const handleResumeUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const token = localStorage.getItem("token");
      // Note: Adjust URL to your upload route
      const res = await axios.post("http://localhost:5000/api/upload/resume", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      // Update state with the newly uploaded info from backend
      setExistingResume({
        name: res.data.profile.resumeFilename,
        id: res.data.fileId
      });
      setResume(null); // Clear the temporary file state
      alert("Resume uploaded successfully!");
    } catch (error) {
      alert("Resume upload failed.");
    }
  };

  const handleSaveAll = async () => {
    try {
      // Construct the payload using your ProfilePayload type
      const payload: ProfilePayload = {
        ...basicInfo,
        skills,
        workExperience,
        education,
        portfolioLinks,
        // resume fields can be added here once upload logic is ready
      };

      await upsertMyProfile(payload);

      alert("Profile updated successfully!");
      setIsEditingBasic(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Error saving profile. Please try again.");
    }
  };

  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    };
    setWorkExperience([...workExperience, newExp]);
    setEditingExperienceId(newExp.id); // Open for editing immediately
  };

  const updateExpField = (id: string, field: keyof WorkExperience, value: any) => {
    setWorkExperience(workExperience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleCancel = () => window.location.reload();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading Your Profile...
        </div>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* PAGE HEADER */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {basicInfo.name || "Set your name"}
          </h2>
          <p className="text-gray-700">
            Manage your personal and professional information
          </p>
        </div>

        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-white border border-gray-300 rounded-xl overflow-hidden relative">

          {/* COVER */}
          <div className="h-32 bg-linear-to-r from-blue-600 to-purple-600 relative z-10">
            <button className="absolute top-4 right-4 flex items-center gap-2 bg-black/30 text-white px-4 py-2 rounded-lg hover:bg-black/40">
              <Camera size={18} />
              Change Cover
            </button>
          </div>

          {/* PROFILE CONTENT */}
          <div className="p-8 -mt-16 flex gap-6 relative z-20">

            {/* PROFILE IMAGE */}
            <div className="relative z-20 w-32 h-32 rounded-xl bg-gray-300 
                            flex items-center justify-center text-4xl font-bold 
                            border-4 border-white shadow-xl">
              {basicInfo.name
                ? basicInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                : "?"}
            </div>

            {/* INFO */}
            <div className="flex-1 mt-16 flex justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {basicInfo.name || "Your Name"}
                </h2>
                <p className="text-gray-800">
                  {basicInfo.title || "Professional Title"}
                </p>
                <p className="text-gray-800 flex items-center gap-2 mt-2">
                  <MapPin size={18} className="text-blue-600" />
                  {basicInfo.location || "Location"}
                </p>
              </div>

              <button
                onClick={() => setIsEditingBasic(!isEditingBasic)}
                className="h-9 px-3 text-sm border border-gray-400 text-gray-800 font-medium
             rounded-lg flex items-center gap-2 hover:bg-gray-100"
              >
                <Edit2 size={14} />
                {isEditingBasic ? "Cancel" : "Edit"}
              </button>

            </div>
          </div>
        </div>

        {/* ================= BASIC INFO ================= */}

        <div className="bg-white border border-gray-300 rounded-xl p-8 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>

            <button
              onClick={() => {
                if (isEditingBasic) {
                  handleSaveAll(); // Save when clicking "Save"
                } else {
                  setIsEditingBasic(true); // Enter edit mode
                }
              }}
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              {isEditingBasic ? <><Save size={16} /> Save</> : <><Edit2 size={16} /> Edit Profile</>}
            </button>
          </div>

          {/* If Editing: Show Inputs. If Not: Show Text */}
          {isEditingBasic ? (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Manually mapping ensures specific labels and layouts */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none"
                  value={basicInfo.name}
                  onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Professional Title</label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none"
                  value={basicInfo.title}
                  onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Location</label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none"
                  value={basicInfo.location}
                  onChange={(e) => setBasicInfo({ ...basicInfo, location: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                <input
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none"
                  value={basicInfo.phone}
                  onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Short Bio</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none"
                  rows={3}
                  value={basicInfo.bio}
                  onChange={(e) => setBasicInfo({ ...basicInfo, bio: e.target.value })}
                />
              </div>
            </div>
          ) : (
            // READ-ONLY VIEW (When not editing)
            <div className="grid md:grid-cols-2 gap-6 py-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Full Name</p>
                <p className="text-gray-900">{basicInfo.name || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Professional Title</p>
                <p className="text-gray-900">{basicInfo.title || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Location</p>
                <p className="text-gray-900">{basicInfo.location || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Phone</p>
                <p className="text-gray-900">{basicInfo.phone || "Not set"}</p>
              </div>
            </div>
          )}
        </div>

        {/* ================= WORK EXPERIENCE ================= */}

        <div className="bg-white border border-gray-300 rounded-xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase size={20} className="text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Work Experience</h3>
            </div>
            <button
              onClick={handleAddExperience}
              className="h-9 px-3 text-sm border border-gray-400 text-gray-800 rounded-lg flex items-center gap-2 hover:bg-gray-100"
            >
              <Plus size={14} /> Add Experience
            </button>
          </div>

          <div className="space-y-8">
            {workExperience.map((exp, index) => (
              <div key={exp._id || exp.id} className={`${index !== 0 ? "pt-8 border-t border-gray-100" : ""}`}>

                {editingExperienceId === exp.id ? (
                  /* --- EDIT FORM --- */
                  <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border border-blue-100">
                    <input
                      placeholder="Job Title"
                      className="p-2 border rounded-md text-black"
                      value={exp.title}
                      onChange={(e) => updateExpField(exp.id, 'title', e.target.value)}
                    />
                    <input
                      placeholder="Company"
                      className="p-2 border rounded-md text-black"
                      value={exp.company}
                      onChange={(e) => updateExpField(exp.id, 'company', e.target.value)}
                    />

                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1">Start Date</label>
                      <input
                        type="month"
                        className="p-2 border rounded-md  text-black"
                        value={exp.startDate}
                        onChange={(e) => updateExpField(exp.id, 'startDate', e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1">End Date</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="month"
                          disabled={exp.isCurrent}
                          className="p-2 border rounded-md flex-1 disabled:bg-gray-200  text-black"
                          value={exp.isCurrent ? "" : exp.endDate}
                          onChange={(e) => updateExpField(exp.id, 'endDate', e.target.value)}
                        />
                        <label className="flex items-center gap-1 text-sm whitespace-nowrap  text-black">
                          <input
                            type="checkbox"
                            checked={exp.isCurrent}
                            onChange={(e) => updateExpField(exp.id, 'isCurrent', e.target.checked)}
                          /> Present
                        </label>
                      </div>
                    </div>

                    <textarea
                      placeholder="Description"
                      className="md:col-span-2 p-2 border rounded-md  text-black"
                      rows={3}
                      value={exp.description}
                      onChange={(e) => updateExpField(exp.id, 'description', e.target.value)}
                    />

                    <div className="md:col-span-2 flex justify-end gap-2">
                      <button onClick={() => setEditingExperienceId(null)} className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md">Done</button>
                    </div>
                  </div>
                ) : (
                  /* --- DISPLAY VIEW --- */
                  <div className="group relative flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <Building2 size={22} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-gray-900 font-bold text-lg">{exp.title || "Job Title"}</h4>
                          <p className="text-gray-700 font-medium">{exp.company || "Company"}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingExperienceId(exp.id)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => setWorkExperience(workExperience.filter(e => e.id !== exp.id))}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-4 text-gray-500 text-sm mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.startDate || "Start"} – {exp.isCurrent ? "Present" : (exp.endDate || "End")}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>


        {/* ================= SKILLS ================= */}
        <div className="bg-white border border-gray-300 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <Award size={20} className="text-blue-600" />
            Skills
          </h3>

          <div className="flex gap-2 mb-4">
            <input
              className="border border-gray-300 rounded-lg p-3 flex-1 text-gray-900"
              placeholder="Add skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
            />
            <button
              onClick={handleAddSkill}
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-200 text-blue-900 font-medium px-3 py-1 rounded-lg flex items-center gap-2"
              >
                {skill}
                <X
                  size={16}
                  className="cursor-pointer hover:text-red-600"
                  onClick={() =>
                    setSkills(skills.filter((s) => s !== skill))
                  }
                />
              </span>
            ))}
          </div>
        </div>

        {/* ================= RESUME ================= */}
        {/* ================= RESUME ================= */}
        <div className="bg-white border border-gray-300 rounded-xl p-8 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            Resume
          </h3>

          {/* 1. If NO resume is in DB and NO new file is selected, show UPLOAD BOX */}
          {!existingResume && !resume && (
            <label className="block border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition text-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleResumeUpload(file);
                }}
              />
              <Upload size={32} className="mx-auto text-blue-600 mb-2" />
              <p className="text-gray-900 font-medium">Click to upload your resume</p>
            </label>
          )}

          {/* 2. Show the SAVED RESUME from MongoDB (This is what was missing) */}
          {existingResume && (
            <div className="flex justify-between items-center bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-600" size={24} />
                <div>
                  <p className="text-gray-900 font-medium">{existingResume.name}</p>
                  <p className="text-xs text-green-600">✓ Uploaded and Saved</p>
                </div>
              </div>
              <button
                onClick={() => setExistingResume(null)}
                className="text-gray-400 hover:text-red-600 transition"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* 3. Show a "New File" selection (if you haven't uploaded it yet) */}
          {resume && !existingResume && (
            <div className="flex justify-between items-center bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <span className="text-blue-900 font-medium italic">{resume.name} (Ready to upload)</span>
              <button onClick={() => setResume(null)} className="text-red-600"><X size={18} /></button>
            </div>
          )}
        </div>
        {/* ================= PORTFOLIO ================= */}
        <div className="bg-white border border-gray-300 rounded-xl p-8 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <LinkIcon size={20} className="text-blue-600" />
            Portfolio Links
          </h3>

          <div className="flex gap-2">
            <input
              className="border border-gray-300 rounded-lg p-3 flex-1 text-black"
              placeholder="https://github.com/username"
              value={newPortfolioLink}
              onChange={(e) => setNewPortfolioLink(e.target.value)}
            />
            <button
              onClick={() => {
                if (!newPortfolioLink.trim()) return;
                setPortfolioLinks([...portfolioLinks, newPortfolioLink]);
                setNewPortfolioLink("");
              }}
              className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 text-gray-700"
            >
              <Plus size={16} /> Add
            </button>
          </div>

          {portfolioLinks.map((link, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
            >
              <a
                href={link.startsWith('http') ? link : `https://${link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {link}
              </a>
              <X
                size={18}
                className="cursor-pointer hover:text-red-600"
                onClick={() =>
                  setPortfolioLinks(
                    portfolioLinks.filter((_, idx) => idx !== i)
                  )
                }
              />
            </div>
          ))}
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="border border-gray-400 text-gray-800 font-medium px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveAll}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Save All Changes
          </button>
        </div>

      </div>
    </main>
  );
}
