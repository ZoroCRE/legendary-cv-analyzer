document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cv-form');
  const loading = document.getElementById('loading');
  const results = document.getElementById('results');
  const resultsTableBody = document.querySelector('#results-table tbody');
  const scoreElement = document.getElementById('score');
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle = document.getElementById('lang-toggle');

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  // Language toggle
  langToggle.addEventListener('click', () => {
    const isArabic = langToggle.textContent === 'English';
    langToggle.textContent = isArabic ? 'العربية' : 'English';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    localStorage.setItem('lang', isArabic ? 'ar' : 'en');
  });

  // Load preferences
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  }
  if (localStorage.getItem('lang') === 'ar') {
    document.documentElement.lang = 'ar';
    langToggle.textContent = 'English';
  }

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    loading.style.display = 'block';
    results.style.display = 'none';

    const cvFile = document.getElementById('cv-upload').files[0];
    const keywords = document.getElementById('keywords').value;

    // Client-side validation
    if (!cvFile || cvFile.type !== 'application/pdf') {
      alert('Please upload a valid PDF file');
      loading.style.display = 'none';
      return;
    }
    if (!keywords || keywords.split(',').length === 0) {
      alert('Please enter at least one keyword');
      loading.style.display = 'none';
      return;
    }

    const formData = new FormData();
    formData.append('cv', cvFile);
    formData.append('keywords', keywords);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      // Display results
      resultsTableBody.innerHTML = '';
      data.matches.forEach(({ keyword, count }) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${keyword}</td><td>${count}</td>`;
        resultsTableBody.appendChild(row);
      });
      scoreElement.textContent = `Match Score: ${data.score.toFixed(2)}%`;
      results.style.display = 'block';
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      loading.style.display = 'none';
    }
  });
});