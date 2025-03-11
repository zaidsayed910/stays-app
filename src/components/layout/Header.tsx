import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, LogIn, Home, MapPin, Heart, HelpCircle, Menu as MenuIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMobileMenuOpen(false);
      toast.success('Successfully signed out');
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || !isHomePage 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">LeeStays</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-gray-700 hover:text-blue-600 font-medium">
              Explore
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
            <Link to="/vendor/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
              List Your Property
            </Link>
          </nav>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100">
              <Search size={20} />
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100">
                  <User size={20} />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <LogIn size={20} className="mr-2" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 border-t border-gray-200">
          <div className="container-custom py-4 space-y-4">
            <Link 
              to="/search" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search size={20} className="text-blue-600 mr-3" />
              <span>Search</span>
            </Link>
            <Link 
              to="/explore" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MapPin size={20} className="text-blue-600 mr-3" />
              <span>Explore</span>
            </Link>
            <Link 
              to="/vendor/dashboard" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home size={20} className="text-blue-600 mr-3" />
              <span>List Your Property</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HelpCircle size={20} className="text-blue-600 mr-3" />
              <span>About</span>
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HelpCircle size={20} className="text-blue-600 mr-3" />
              <span>Contact</span>
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={20} className="text-blue-600 mr-3" />
                  <span>My Account</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 w-full text-red-600"
                >
                  <LogIn size={20} className="mr-3" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn size={20} className="text-blue-600 mr-3" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;