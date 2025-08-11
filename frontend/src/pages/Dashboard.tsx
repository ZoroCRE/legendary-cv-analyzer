import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../api/analysisApi';
import DashboardCard from '../components/DashboardCard';
import SubmissionTable from '../components/SubmissionTable';
import KeywordListManager from '../components/KeywordListManager';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await getDashboardData();
      setData(res);
    })();
  }, []);

  if (!data) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        <DashboardCard title="Total CVs" value={data.totalCVs} />
        <DashboardCard title="Top Keywords" value={data.analysisKeywords.join(', ')} />
        <DashboardCard title="Average Match" value={`${data.avgMatch}%`} />
      </div>
      <div className="mt-8">
        <SubmissionTable submissions={data.results} />
      </div>
      <div className="mt-8">
        <KeywordListManager />
      </div>
    </div>
  );
};

export default Dashboard;
