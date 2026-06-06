import React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <header style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem 0' }}>
      <div className="container d-flex align-center justify-between">
        <Link to="/" className="d-flex align-center gap-2 hover-lift">
          <Activity size={32} />
          <div className="flex-col">
            <h1 className="text-xl font-bold" style={{ color: 'white' }}>GoldenHour AI</h1>
            <span className="text-sm" style={{ color: 'var(--secondary)' }}>Real-Time Emergency Assessment</span>
          </div>
        </Link>
        <nav className="d-flex gap-4">
          <Link to="/ambulance" className={`btn ${location.pathname === '/ambulance' ? 'btn-outline' : ''}`} style={location.pathname === '/ambulance' ? { color: 'white', borderColor: 'white' } : { color: 'var(--secondary)' }}>
            Ambulance Portal
          </Link>
          <Link to="/hospital" className={`btn ${location.pathname === '/hospital' ? 'btn-outline' : ''}`} style={location.pathname === '/hospital' ? { color: 'white', borderColor: 'white' } : { color: 'var(--secondary)' }}>
            Hospital Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
