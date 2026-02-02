"use client";

import { useState } from "react";
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


/* ================= TYPES ================= */

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
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

  /* ================= HANDLERS ================= */

  const handleAddSkill = () => {
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const handleSaveAll = () => {
    console.log({
      basicInfo,
      skills,
      workExperience,
      education,
      resume,
      portfolioLinks,
    });
    alert("Profile saved successfully");
  };

  const handleCancel = () => window.location.reload();

  /* ================= UI ================= */

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* PAGE HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-700">
            Manage your personal and professional information
          </p>
        </div>

        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-white border border-gray-300 rounded-xl overflow-hidden relative">

          {/* COVER */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative z-10">
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
            <h3 className="text-xl font-semibold text-gray-900">
              Basic Information
            </h3>
            {isEditingBasic && (
              <button
                onClick={() => setIsEditingBasic(false)}
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
            )}
          </div>

          {isEditingBasic && (
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(basicInfo).map(([key, value]) => (
                <input
                  key={key}
                  className="border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  placeholder={key}
                  value={value}
                  onChange={(e) =>
                    setBasicInfo({ ...basicInfo, [key]: e.target.value })
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* ================= WORK EXPERIENCE ================= */}
        <div className="bg-white border border-gray-300 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Briefcase size={20} className="text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Work Experience
              </h3>
            </div>

            <button
              className="h-9 px-3 text-sm border border-gray-400 text-gray-800 
                 rounded-lg flex items-center gap-2 hover:bg-gray-100"
              onClick={() =>
                setWorkExperience([
                  ...workExperience,
                  {
                    id: Date.now().toString(),
                    title: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  },
                ])
              }
            >
              <Plus size={14} />
              Add Experience
            </button>
          </div>

          {workExperience.length === 0 ? (
            <p className="text-gray-600">No work experience added yet.</p>
          ) : (
            <div className="space-y-6">
              {workExperience.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`${index !== 0 ? "pt-6 border-t border-gray-200" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 size={22} className="text-blue-600" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-gray-900 font-semibold">
                            {exp.title || "Job Title"}
                          </h4>
                          <p className="text-gray-700">
                            {exp.company || "Company Name"}
                          </p>
                        </div>

                        <button
                          className="text-gray-500 hover:text-red-600"
                          onClick={() =>
                            setWorkExperience(
                              workExperience.filter((e) => e.id !== exp.id)
                            )
                          }
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="flex gap-4 text-gray-700 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.startDate || "Start"} – {exp.endDate || "End"}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location || "Location"}
                        </span>
                      </div>

                      <p className="text-gray-700">
                        {exp.description || "Role description"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
        <div className="bg-white border border-gray-300 rounded-xl p-8 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            Resume
          </h3>

          <label className="block border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
            />
            <div className="text-center space-y-2">
              <Upload size={32} className="mx-auto text-blue-600" />
              <p className="text-gray-900 font-medium">
                Click to upload your resume
              </p>
              <p className="text-gray-700 text-sm">
                PDF or DOC (max 5MB)
              </p>
            </div>
          </label>

          {resume && (
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="text-gray-900 font-medium">
                {resume.name}
              </span>
              <button
                onClick={() => setResume(null)}
                className="text-red-600 flex items-center gap-1"
              >
                <X size={16} /> Remove
              </button>
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
              className="border border-gray-300 rounded-lg p-3 flex-1"
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
              <span className="text-gray-900">{link}</span>
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
