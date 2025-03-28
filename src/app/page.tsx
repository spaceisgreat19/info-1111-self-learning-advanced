export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {/* Header code directly added with styling */}
      <header style={{ backgroundColor: '#6c757d', padding: '15px 20px' }}>
        <nav>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', justifyContent: 'center' }}>
            <li style={{ marginRight: '20px' }}>
              <a href="/maintenance" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Maintenance</a>
            </li>
            <li style={{ marginRight: '20px' }}>
              <a href="/committee" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Committee</a>
            </li>
            <li style={{ marginRight: '20px' }}>
              <a href="/finance" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Finance</a>
            </li>
            <li style={{ marginRight: '20px' }}>
              <a href="/vote" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Vote</a>
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
          <img
            src="/strata_project.jpg"
            alt="Strata Project"
            style={{
              maxWidth: '100%',
              height: 'auto',
              width: '300px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <img
            src="/strata.jpg"
            alt="Strata Project"
            style={{
              maxWidth: '100%',
              height: 'auto',
              width: '300px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
      </main>
    </div>
  );
}