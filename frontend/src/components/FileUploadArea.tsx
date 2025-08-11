import React, { useState } from 'react';
import { submitAnalysis } from '../api/analysisApi';

type Props = { onResult?: (res: any) => void };

const FileUploadArea = ({ onResult }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [keywords, setKeywords] = useState('');

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleSubmit = async () => {
    if (!files.length) return alert('No files');
    const kw = keywords.split(',').map(k => k.trim()).filter(Boolean);
    const res = await submitAnalysis(files, kw);
    onResult && onResult(res);
  };

  return (
    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="p-6 border-2 border-dashed rounded">
      <p>Drag files here or click to select</p>
      <input type="file" multiple onChange={(e) => {
        if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files)]);
      }} />
      <textarea placeholder="keywords,comma,separated" value={keywords} onChange={(e)=>setKeywords(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FileUploadArea;
