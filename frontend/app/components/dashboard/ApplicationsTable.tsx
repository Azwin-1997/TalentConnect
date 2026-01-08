interface Application {
  id: string;
  jobRole: string;
  company: string;
  status: "pending" | "shortlisted" | "rejected" | "interview";
  appliedDate: string;
}

interface ApplicationsTableProps {
  applications: Application[];
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const getStatusStyles = (status: Application["status"]) => {
    const styles = {
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      shortlisted: "bg-blue-50 text-blue-700 border-blue-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
      interview: "bg-green-50 text-green-700 border-green-200",
    };
    return styles[status];
  };

  const getStatusLabel = (status: Application["status"]) => {
    const labels = {
      pending: "Pending",
      shortlisted: "Shortlisted",
      rejected: "Rejected",
      interview: "Interview",
    };
    return labels[status];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-gray-700">Job Role</th>
              <th className="px-6 py-4 text-left text-gray-700">Company</th>
              <th className="px-6 py-4 text-left text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-gray-700">Applied Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((app) => (
              <tr
                key={app.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 text-gray-900">{app.jobRole}</td>
                <td className="px-6 py-4 text-gray-700">{app.company}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 text-sm rounded-full border ${getStatusStyles(
                      app.status
                    )}`}
                  >
                    {getStatusLabel(app.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{app.appliedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
