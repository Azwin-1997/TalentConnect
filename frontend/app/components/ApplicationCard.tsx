interface ApplicationCardProps {
  title: string;
  company: string;
  location: string;
  status: string;
}

export default function ApplicationCard({
  title,
  company,
  location,
  status,
}: ApplicationCardProps) {
  return (
    <div className="rounded-lg border p-4 bg-white shadow-sm">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{company}</p>
      <p className="text-sm text-gray-500">{location}</p>

      <span className="inline-block mt-2 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
        {status}
      </span>
    </div>
  );
}
