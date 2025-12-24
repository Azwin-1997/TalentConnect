import { UserPlus, FileCheck, Briefcase } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description: "Sign up in minutes and join thousands of job seekers and recruiters",
  },
  {
    icon: FileCheck,
    title: "Build Your Profile",
    description: "Showcase your skills, experience, and what you're looking for",
  },
  {
    icon: Briefcase,
    title: "Apply to Jobs or Hire Talent",
    description: "Connect with opportunities or find the perfect candidate",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <step.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
