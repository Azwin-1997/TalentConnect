interface SavedJobCardProps {
  title: string;
  company: string;
  location: string;
  jobType: string;
  savedAt: string;
  onRemove: () => void;
}

export default function SavedJobCard({
  title,
  company,
  location,
  jobType,
  savedAt,
  onRemove,
}: SavedJobCardProps) {
  return (
    <div className="rounded-lg border p-4 bg-white shadow-sm">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{company}</p>
      <p className="text-sm text-gray-500">{location}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
          {jobType}
        </span>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            Saved {savedAt}
          </span>

          <button
            onClick={onRemove}
            className="text-xs font-medium text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
