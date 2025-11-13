import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Pets from './pages/Pets';

const VALID_PAGES = new Set(['home', 'about', 'shop', 'pets', 'contact', 'privacy']);

const getPageFromPath = (path: string) => {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  if (!trimmed) {
    return 'home';
  }
  return VALID_PAGES.has(trimmed) ? trimmed : null;
};

const getInitialPage = () => {
  if (typeof window !== 'undefined') {
    const fromPath = getPageFromPath(window.location.pathname);
    if (fromPath) {
      return fromPath;
    }

    const stored = window.localStorage.getItem('pure-serenity-current-page');
    if (stored && VALID_PAGES.has(stored)) {
      return stored;
    }
  }

  return 'home';
};

function App() {
  const [currentPage, setCurrentPage] = useState<string>(getInitialPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialPath = currentPage === 'home' ? '/' : `/${currentPage}`;
      if (window.location.pathname !== initialPath) {
        window.history.replaceState({}, '', initialPath);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('pure-serenity-current-page', currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handlePopState = () => {
      const fromPath = getPageFromPath(window.location.pathname);
      setCurrentPage(fromPath ?? 'home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback((page: string) => {
    const nextPage = VALID_PAGES.has(page) ? page : 'home';
    setCurrentPage(nextPage);

    if (typeof window !== 'undefined') {
      const targetPath = nextPage === 'home' ? '/' : `/${nextPage}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'shop':
        return <Shop />;
      case 'pets':
        return <Pets />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <Privacy />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
