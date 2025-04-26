
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, User } from 'lucide-react';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if user is logged in from localStorage
  useEffect(() => {
    const user = localStorage.getItem('mangoUser');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mangoUser');
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-mango-green">Dogar<span className="text-mango-yellow">Farms</span></span>
            {/* <span className="ml-2 text-sm font-medium text-mango-green">Haven</span> */}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-mango-green hover:text-mango-yellow font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-mango-green hover:text-mango-yellow font-medium transition-colors">
              About Us
            </Link>
            <Link to="/products" className="text-mango-green hover:text-mango-yellow font-medium transition-colors">
              Products
            </Link>
            <Link to="/contact" className="text-mango-green hover:text-mango-yellow font-medium transition-colors">
              Contact
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <User className="text-mango-green" size={18} />
                <Button 
                  variant="outline" 
                  className="border-mango-green text-mango-green hover:bg-mango-green hover:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                className="bg-mango-yellow text-white hover:bg-mango-orange btn-hover"
                onClick={() => setAuthModalOpen(true)}
              >
                Login / Sign Up
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu />
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-mango-green hover:text-mango-yellow font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-mango-green hover:text-mango-yellow font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/products" 
                className="text-mango-green hover:text-mango-yellow font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/contact" 
                className="text-mango-green hover:text-mango-yellow font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {isLoggedIn ? (
                <Button 
                  variant="outline" 
                  className="border-mango-green text-mango-green hover:bg-mango-green hover:text-white w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button 
                  className="bg-mango-yellow text-white hover:bg-mango-orange w-full"
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Login / Sign Up
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
      
      <AuthModal open={authModalOpen} setOpen={setAuthModalOpen} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
};

export default Navbar;
