import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { FoundationProvider } from './context/FoundationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { DonatePage } from './pages/DonatePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-page)] text-[var(--text-body)]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <FoundationProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppShell />
      </BrowserRouter>
    </FoundationProvider>
  );
}

export default App;
