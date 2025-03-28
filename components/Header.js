import Link from 'next/link';

const Header = () => {
  return (
    <header style={{ background: '#333', color: '#fff', padding: '10px 0' }}>
      <nav>
        <ul style={{ display: 'flex', justifyContent: 'center', listStyleType: 'none' }}>
          <li style={{ margin: '0 15px' }}>
            <Link href="/committee" style={{ color: '#fff', textDecoration: 'none' }}>Committee</Link>
          </li>
          <li style={{ margin: '0 15px' }}>
            <Link href="/finance" style={{ color: '#fff', textDecoration: 'none' }}>Finance</Link>
          </li>
          <li style={{ margin: '0 15px' }}>
            <Link href="/maintenance" style={{ color: '#fff', textDecoration: 'none' }}>Maintenance</Link>
          </li>
          <li style={{ margin: '0 15px' }}>
            <Link href="/vote" style={{ color: '#fff', textDecoration: 'none' }}>Vote</Link>
          </li>
          <li style={{ margin: '0 15px' }}>
            <Link href="/maintenance-requests" style={{ color: '#fff', textDecoration: 'none' }}>Maintenance Requests</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;