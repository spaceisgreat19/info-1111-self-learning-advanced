// pages/committee.tsx
import Header from '../components/Header'; // Import the Header component

export default function Committee() {
    return (
      <div>
        <Header /> {/* Add the Header here */}
        <h1>Committee Members</h1>
        <ul>
          <li>Chairperson: John Doe</li>
          <li>Secretary: Jane Smith</li>
          <li>Treasurer: Bob Johnson</li>
        </ul>
      </div>
    );
}