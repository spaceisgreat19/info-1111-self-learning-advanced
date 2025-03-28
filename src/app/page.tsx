import Link from 'next/link'; // Import Link from next/link
import Image from 'next/image'; // Import Image for optimized images

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {/* Header code directly added with styling */}
      <header style={{ backgroundColor: '#6c757d', padding: '15px 20px' }}>
        <nav>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
            {/* Committee Link */}
            <li style={{ marginRight: '20px' }}>
              <Link href="/committee">
                <span style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Committee</span>
              </Link>
            </li>

            {/* Finance Link */}
            <li style={{ marginRight: '20px' }}>
              <Link href="/finance">
                <span style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Finance</span>
              </Link>
            </li>

            {/* Maintenance Link */}
            <li style={{ marginRight: '20px' }}>
              <Link href="/maintenance">
                <span style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Maintenance</span>
              </Link>
            </li>

            {/* Vote Link */}
            <li style={{ marginRight: '20px' }}>
              <Link href="/vote">
                <span style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Vote</span>
              </Link>
            </li>

            {/* Maintenance Requests Link */}
            <li style={{ marginRight: '20px' }}>
              <Link href="/maintenance-requests">
                <span style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Maintenance Requests</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main content section */}
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Strata Management System</h1>
        <p style={{ fontSize: '20px', marginBottom: '30px' }}>
          Manage your apartment complex with ease.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <ul style={{ listStyleType: 'none', padding: 0, fontSize: '18px', textAlign: 'left' }}>
            <li>Track maintenance requests</li>
            <li>Manage committee members</li>
            <li>View financial records</li>
            <li>Vote on important matters</li>
          </ul>
        </div>

        {/* Images section */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Image
            src="/strata_project.jpg"
            alt="Strata Project"
            width={300}
            height={200}
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Image
            src="/strata.jpg"
            alt="Strata Project"
            width={300}
            height={200}
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
      </main>
    </div>
  );
}