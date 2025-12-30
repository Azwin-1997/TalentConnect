import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = "neutral",
}: StatsCardProps) {
  const changeColor = {
    positive: "text-green-600 bg-green-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        {change && (
          <span
            className={`px-2 py-1 text-xs rounded-full ${changeColor[changeType]}`}
          >
            {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-600 mb-1">{title}</p>
        <h3 className="text-gray-900">{value}</h3>
      </div>
    </div>
  );
}
