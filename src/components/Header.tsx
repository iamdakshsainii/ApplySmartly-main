
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AS</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ApplySmart
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              How it Works
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Reviews
            </a>
            <button
              onClick={() => navigate('/demo')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Demo
            </button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/auth')}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-4 py-2">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-4 py-2">
                How it Works
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-4 py-2">
                Reviews
              </a>
              <button
                onClick={() => navigate('/demo')}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium px-4 py-2 text-left"
              >
                Demo
              </button>
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => navigate('/dashboard')}
                      className="text-gray-600 hover:text-blue-600 justify-start"
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className="text-gray-600 hover:text-blue-600 justify-start"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => navigate('/auth')}
                      className="text-gray-600 hover:text-blue-600 justify-start"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => navigate('/auth')}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
