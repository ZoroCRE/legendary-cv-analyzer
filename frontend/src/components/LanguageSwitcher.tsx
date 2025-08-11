import React, { useState } from 'react';

const LanguageSwitcher: React.FC = () => {
  const [lang, setLang] = useState('en');

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="p-2 bg-gray-700 rounded"
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
};

export default LanguageSwitcher;
