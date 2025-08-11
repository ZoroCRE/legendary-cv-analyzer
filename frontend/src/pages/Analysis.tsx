import React, { useState } from 'react';
import { uploadCV } from '../api/analysisApi';
import FileUploadArea from '../components/FileUploadArea';

const Analysis: React.FC = () => {
  const [result, setResult] = useState<any>(null);

  const handleUpload = async (file: File) => {
    const res = await uploadCV(file);
    setResult(res);
  };

  return (
    <div className="p-4">
      <FileUploadArea onFileSelected={handleUpload} />
      {result && (
        <div className="mt-4 bg-gray-800 p-4 rounded text-white">
          <h2 className="text-xl mb-2">Analysis Result</h2>
          <p>Match Percentage: {result.matchPercentage}%</p>
        </div>
      )}
    </div>
  );
};

export default Analysis;
