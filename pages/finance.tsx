// pages/finance.tsx
import Header from '../components/Header'; // Import the Header component

export default function Finance() {
  return (
    <div>
      <Header /> {/* Add the Header here */}
      <h1>Financial Reports</h1>
      <p>Latest report: Q1 2025</p>
      <a href="/reports/q1-2025.pdf" download>Download Report</a>
    </div>
  );
}