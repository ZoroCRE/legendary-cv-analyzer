const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function analyzeCV(cvFile: File, keywords: string[]): Promise<{ matches: { keyword: string, count: number }[], score: number }> {
  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
  if (!allowedTypes.includes(cvFile.type)) {
    throw new Error('Only PDF, Docx, PNG, or JPEG files are allowed');
  }

  const formData = new FormData();
  formData.append('cv', cvFile);
  formData.append('keywords', keywords.join(','));

  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to analyze CV: ${errorText}`);
  }

  return response.json();
}
