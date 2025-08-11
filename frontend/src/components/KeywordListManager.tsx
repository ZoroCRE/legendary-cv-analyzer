import React, { useEffect, useState } from 'react';
import { manageKeywordList } from '../api/analysisApi';

interface KeywordList {
  id: number;
  list_name: string;
  keywords: string[];
}

const KeywordListManager: React.FC = () => {
  const [lists, setLists] = useState<KeywordList[]>([]);
  const [listName, setListName] = useState('');
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    // Fetch from backend or Supabase
  }, []);

  const handleAdd = async () => {
    await manageKeywordList('create', {
      list_name: listName,
      keywords: keywords.split(',').map(k => k.trim())
    });
    setListName('');
    setKeywords('');
  };

  return (
    <div className="p-4 bg-gray-800 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Manage Keyword Lists</h2>
      <input
        type="text"
        value={listName}
        onChange={e => setListName(e.target.value)}
        placeholder="List Name"
        className="w-full p-2 mb-2 rounded"
      />
      <textarea
        value={keywords}
        onChange={e => setKeywords(e.target.value)}
        placeholder="Enter keywords separated by commas"
        className="w-full p-2 mb-2 rounded"
      />
      <button onClick={handleAdd} className="bg-blue-500 px-4 py-2 rounded">
        Add List
      </button>
      <ul className="mt-4">
        {lists.map(list => (
          <li key={list.id} className="p-2 border-b border-gray-700">
            <strong>{list.list_name}</strong> - {list.keywords.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordListManager;
