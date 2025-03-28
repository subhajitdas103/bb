
import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Trophy, Users, Calendar, DollarSign, User, Settings, Shield } from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Toggle Mobile Menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/Dashboard' },
    { name: 'Tournaments', icon: Trophy, path: '/tournaments' },
    { name: 'Groups', icon: Users, path: '/groups' },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'Transactions', icon: DollarSign, path: '/transactions' },
    { name: 'Account', icon: User, path: '/account' },
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Super Admin', icon: Shield, path: '/super-admin' },
  ];

  // For a real app, you'd check if the user has admin permissions
  const isAdmin = true; // This would come from your auth context or state

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    // Only show Super Admin link to admin users
    if (item.name === 'Super Admin' && !isAdmin) {
      return false;
    }
    return true;
  });

  return (
    <nav className="glass-card fixed left-0 top-0 z-10 w-full border-b border-silver-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/Dashboard" className="text-xl font-semibold text-primary" style={{}}>
              Better Bracket
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {filteredMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-silver-100 text-primary'
                      : 'text-silver-600 hover:bg-silver-50'
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center">
            <button className="flex items-center rounded-full border border-silver-200 bg-white p-1 shadow-sm transition-all duration-200 hover:shadow">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-2 mr-2">
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-silver-500">Group Leader</div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label="Toggle navigation menu"
              className="rounded-md p-2 text-silver-600 hover:bg-silver-100 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-silver-100 text-primary'
                    : 'text-silver-600 hover:bg-silver-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </div>
              </Link>
            ))}

            {/* Mobile Profile Section */}
            <div className="mt-4 border-t border-silver-200 pt-4">
              <div className="flex items-center px-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="h-8 w-8 rounded-full"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-silver-500">Group Leader</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
