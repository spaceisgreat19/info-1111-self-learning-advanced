import { useState } from 'react';
import Header from '../components/Header';

export default function GenerateLevy() {
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('dueDate', dueDate);
    formData.append('reason', reason);

    try {
      const response = await fetch('https://strata-pdf-generator.onrender.com/generate-pdf.php', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'levy_notice.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Error: Unable to generate PDF. Please try again.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Generate Levy Notice</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label>Amount</label>
              <input
                type="number"
                placeholder="e.g. 3000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label>Reason</label>
              <textarea
                placeholder="e.g. Monthly rent, repair fee"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#0070f3',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Generate PDF
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}