type EmptyStateProps = {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
};

export default function EmptyState({
    title,
    description,
    actionLabel,
    onAction,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-xl font-bold text-gray-900">
                {title}
            </h3>

            <p className="mt-2 text-gray-500">{description}</p>

            {actionLabel && (
                <button
                    onClick={onAction}
                    className="mt-6 rounded-md bg-black px-4 py-2 text-white"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
