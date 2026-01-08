import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface ProfileTip {
  id: string;
  title: string;
  completed: boolean;
}

export function ProfilePanel() {
  const profileCompleteness = 75;

  const tips: ProfileTip[] = [
    { id: "1", title: "Add profile photo", completed: true },
    { id: "2", title: "Complete work experience", completed: true },
    { id: "3", title: "Add skills", completed: true },
    { id: "4", title: "Upload resume", completed: false },
    { id: "5", title: "Add portfolio links", completed: false },
  ];

  const completedTips = tips.filter((tip) => tip.completed).length;

  return (
    <div className="space-y-6">
      {/* Profile Completeness Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Profile Completeness</h3>
          <span className="text-blue-600">{profileCompleteness}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-4">
  <div
    className="h-2 bg-blue-600 rounded-full"
    style={{ width: `${profileCompleteness}%` }}
  />
</div>

        <p className="text-gray-600">
          Complete your profile to get better job matches
        </p>
      </div>

      {/* Tips to Improve Profile */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Improve Your Profile</h3>
          <span className="text-gray-600">
            {completedTips}/{tips.length}
          </span>
        </div>

        <div className="space-y-3">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {tip.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
              <span
                className={`flex-1 ${
                  tip.completed
                    ? "text-gray-500 line-through"
                    : "text-gray-700"
                }`}
              >
                {tip.title}
              </span>
              {!tip.completed && (
                <ArrowRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-white mb-2">Get Premium</h3>
        <p className="text-blue-100 mb-4">
          Unlock advanced job matching and priority applications
        </p>
        <button className="w-full bg-white text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition-colors">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
