export default function DashboardCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
