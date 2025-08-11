import React from 'react';
import { createRoot } from 'react-dom/client';
import CVAnalyzerApp from './cv-analyzer-legendary';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CVAnalyzerApp />
  </React.StrictMode>
);
