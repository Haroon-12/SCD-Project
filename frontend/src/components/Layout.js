import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';
import { Button } from "./ui/button";

function Layout({ children }) {
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/users", label: "Users" },
    { to: "/monitoring", label: "System" },
    { to: "/helpdesk", label: "Help Desk" },
    { to: "/feedback", label: "Feedbacks" },
    { to: "/approvals", label: "Registration" },
  ];

  return (
    <div className={`flex flex-col min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <header className="bg-gray-800 text-white py-4 ">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {navItems.map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`hover:underline px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.to ? 'bg-gray-700' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
          <Button onClick={toggleTheme} className="p-2 rounded-md">
              {theme === "dark" ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </Button>
            <button
              className="md:hidden p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-300"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
          <button className="mb-4" onClick={() => setSidebarOpen(false)}>Close</button>
          <nav className="flex flex-col space-y-4">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`hover:underline px-3 py-2 rounded-md text-sm font-medium ${location.pathname === item.to ? 'bg-gray-700' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-grow container mx-auto py-8">
        {children}
      </main>
      <footer className={`bg-gray-100 py-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <div className={`container mx-auto text-center text-sm ${theme === "dark" ? "text-white" : "text-gray-600"}`}>
          © 2024 Admin Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Layout;
