interface StudentRow {
  id: string;
  fullName: string;
  email: string;
}

export function StudentProgressTable({ students }: { students: StudentRow[] }) {
  if (!students.length) {
    return <p className="text-sm text-slate-500 py-8 text-center">No students enrolled yet.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900 text-left">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Attendance</th>
            <th className="px-4 py-3 font-medium">Avg. Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-t border-slate-100 dark:border-slate-800">
              <td className="px-4 py-3 font-medium">{s.fullName}</td>
              <td className="px-4 py-3 text-slate-500">{s.email}</td>
              <td className="px-4 py-3 text-slate-500">— %</td>
              <td className="px-4 py-3 text-slate-500">—</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
