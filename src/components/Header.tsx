import { useState, useMemo } from 'react';
import { Menu, X, Search } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  const navItems = useMemo(
    () => [
      { name: 'Home', id: 'home' },
      { name: 'About', id: 'about' },
      { name: 'Shop', id: 'shop' },
      { name: 'Pets', id: 'pets' },
      { name: 'Contact', id: 'contact' }
    ],
    []
  );

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return navItems;
    }
    return navItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [navItems, query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#F8DAED]/95 backdrop-blur-sm shadow-sm border-b border-pink-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 gap-6 py-2">
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <img
              src="assets/images/pureSerenity.png"
              alt="Pure Serenity Shop"
              className="h-20 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-base font-medium transition-all duration-300 relative group ${
                  currentPage === item.id
                    ? 'text-purple-700'
                    : 'text-[#DC2E7C] hover:text-[#DC2E7C]'
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 transition-transform duration-300 ${
                    currentPage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-pink-700/80" />
              <input
                type="search"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search navigation..."
                className="pl-11 pr-4 py-2 rounded-full bg-white/80 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#DC2E7C] focus:border-transparent transition-all duration-200 text-sm text-[#DC2E7C] placeholder:text-[#b26aa0]"
              />
            </div>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-pink-100/60 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-[#DC2E7C]" />
            ) : (
              <Menu className="h-6 w-6 text-[#DC2E7C]" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden bg-[#F8DAED] border-t border-pink-200/60 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-purple-50 text-purple-700 font-medium'
                  : 'text-[#DC2E7C] hover:bg-white/70'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}






