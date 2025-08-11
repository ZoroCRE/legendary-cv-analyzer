export default function SubmissionTable({ results }: { results: any[] }) {
  return (
    <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded shadow">
      <thead>
        <tr>
          <th className="border p-2">File Name</th>
          <th className="border p-2">Match %</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r, idx) => (
          <tr key={idx}>
            <td className="border p-2">{r.fileName}</td>
            <td className="border p-2">{r.matchPercentage}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
