import React from 'react';
import { FaComments, FaEnvelope, FaListAlt, FaInfoCircle, FaUser } from 'react-icons/fa';

interface BottomNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const navItems = [
  { key: 'list', label: 'Chats', icon: <FaComments /> },
  { key: 'chat', label: 'Messages', icon: <FaEnvelope /> },
  { key: 'activity', label: 'Activity', icon: <FaListAlt /> },
  { key: 'details', label: 'Details', icon: <FaInfoCircle /> },
  { key: 'profile', label: 'Profile', icon: <FaUser /> },
];

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex justify-around h-16 lg:hidden">
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => setCurrentView(item.key)}
          className={`flex flex-col items-center justify-center flex-1 h-full text-xs font-medium transition-colors ${
            currentView === item.key
              ? 'text-trust-blue'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-label={item.label}
        >
          <span className="text-lg mb-1">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav; 