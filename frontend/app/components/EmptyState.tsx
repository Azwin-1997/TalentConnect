import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  href?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title,
  description,
  actionLabel,
  href,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}

      {/* Link action */}
      {actionLabel && href && (
        <Link
          href={href}
          className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          {actionLabel}
        </Link>
      )}

      {/* Button action */}
      {actionLabel && onAction && !href && (
        <button
          onClick={onAction}
          className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
