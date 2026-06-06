@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #0A58CA;
  --primary-hover: #084298;
  --secondary: #eef5ff;
  --accent-red: #D32F2F;
  --accent-red-hover: #B71C1C;
  --light-red: #fdeaea;
  
  --bg-color: #f4f7f9;
  --card-bg: #ffffff;
  
  --text-dark: #0f172a;
  --text-regular: #334155;
  --text-muted: #64748B;
  
  --border: #e2e8f0;
  
  --success: #10B981;
  --success-light: #e1fbf0;
  --warning: #F59E0B;
  --warning-light: #fff6e5;
  
  --font-sans: 'Inter', system-ui, sans-serif;
  
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--bg-color);
  color: var(--text-regular);
  -webkit-font-smoothing: antialiased;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--text-dark);
  font-weight: 600;
  line-height: 1.2;
}

input, select {
  font-family: inherit;
}

/* Layout */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

/* Common Components */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.card {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  border: 1px solid var(--border);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--primary);
  color: white;
}
.btn-primary:hover {
  background: var(--primary-hover);
}

.btn-danger {
  background: var(--accent-red);
  color: white;
}
.btn-danger:hover {
  background: var(--accent-red-hover);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dark);
}
.btn-outline:hover {
  background: var(--secondary);
  border-color: var(--primary);
  color: var(--primary);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}
.badge-success {
  background: var(--success-light);
  color: var(--success);
}
.badge-warning {
  background: var(--warning-light);
  color: var(--warning);
}
.badge-danger {
  background: var(--light-red);
  color: var(--accent-red);
}

/* Forms */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
  font-size: 0.875rem;
}

.form-control {
  width: 100%;
  padding: 0.625rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: var(--text-dark);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(10, 88, 202, 0.1);
}

/* Utility */
.d-flex { display: flex; }
.flex-col { flex-direction: column; }
.align-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 1rem; }
.gap-4 { gap: 1.5rem; }
.gap-6 { gap: 2.5rem; }

.text-center { text-align: center; }
.text-muted { color: var(--text-muted); }
.text-danger { color: var(--accent-red); }
.text-sm { font-size: 0.875rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-6 { margin-top: 1.5rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }

/* Grid Layouts */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

.col-span-1 { grid-column: span 1; }
.col-span-2 { grid-column: span 2; }
.col-span-3 { grid-column: span 3; }
.col-span-4 { grid-column: span 4; }

@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .lg\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  
  .lg\:col-span-1 { grid-column: span 1; }
  .lg\:col-span-2 { grid-column: span 2; }
  .lg\:col-span-3 { grid-column: span 3; }
  .lg\:col-span-4 { grid-column: span 4; }
}

/* Modal Stylings */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease-out forwards;
}

.modal-content {
  background: white;
  width: 90%;
  max-width: 650px;
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 85vh;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--card-bg);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.village-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.village-pill {
  border: 1px solid var(--border);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  color: var(--text-dark);
}

.village-pill:hover {
  border-color: var(--primary);
  color: var(--primary);
  box-shadow: 0 2px 4px rgba(10,88,202,0.1);
}

.detect-location-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--primary);
  font-weight: 600;
  padding: 1rem;
  border-radius: var(--radius-sm);
  background: var(--secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.detect-location-btn:hover {
  background: #dbeafe;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: none; }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(211, 47, 47, 0); }
  100% { box-shadow: 0 0 0 0 rgba(211, 47, 47, 0); }
}

.pulse-alert {
  animation: pulse 2s infinite;
}

/* Progress bar */
.progress-bg {
  width: 100%;
  height: 8px;
  background-color: var(--border);
  border-radius: 9999px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.3s ease;
}
.progress-success { background-color: var(--success); }
.progress-warning { background-color: var(--warning); }
.progress-danger { background-color: var(--accent-red); }

/* Table styles */
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}
.table th {
  font-weight: 600;
  color: var(--text-muted);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Animations extra */
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Reroute banner animation */
@keyframes slideInFade {
  0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  10% { opacity: 1; transform: translateX(-50%) translateY(0); }
  85% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
}

.reroute-banner {
  position: fixed;
  top: 80px;
  left: 50%;
  z-index: 99999;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 8px 25px rgba(30,64,175,0.35);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: slideInFade 4.5s ease-out forwards;
}

/* Recommendation changed highlight */
@keyframes highlightFlash {
  0% { box-shadow: 0 0 0 0 rgba(10,88,202,0.5); }
  30% { box-shadow: 0 0 0 6px rgba(10,88,202,0.2); }
  100% { box-shadow: 0 0 0 0 rgba(10,88,202,0); }
}

.recommendation-highlight {
  animation: highlightFlash 1.5s ease-out;
}

/* Simulation mode footer */
.simulation-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  color: var(--text-muted);
  background: var(--bg-color);
  border: 1px dashed var(--border);
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0.03em;
}
