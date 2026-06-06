import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'white', borderTop: '1px solid var(--border)', padding: '2rem 0' }}>
      <div className="container d-flex flex-col align-center text-center gap-2">
        <h3 className="text-muted font-semibold">GoldenHour AI &copy; {new Date().getFullYear()}</h3>
        <p className="text-sm text-muted">Optimizing trauma patient routing to save lives during the Golden Hour.</p>
        <div className="d-flex justify-center gap-4 text-sm mt-2">
          <span>Demo Application</span>
          <span>&middot;</span>
          <span>FastAPI Ready</span>
        </div>
      </div>
    </footer>
  );
}
