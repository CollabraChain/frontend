import React from 'react';
import { FaEnvelope, FaListAlt, FaInfoCircle, FaUser } from 'react-icons/fa';

interface SidebarNavProps {
    currentView: string;
    setCurrentView: (view: string) => void;
}

const navItems = [
    { key: 'chat', label: 'Messages', icon: <FaEnvelope /> },
    { key: 'activity', label: 'Activity', icon: <FaListAlt /> },
    { key: 'details', label: 'Details', icon: <FaInfoCircle /> },
    { key: 'profile', label: 'Profile', icon: <FaUser /> },
];

const SidebarNav: React.FC<SidebarNavProps> = ({ currentView, setCurrentView }) => {
    return (
        <nav className="hidden lg:flex flex-col w-20 bg-card border-r border-border py-4 items-center space-y-6">
            {navItems.map((item) => (
                <button
                    key={item.key}
                    onClick={() => setCurrentView(item.key)}
                    className={`flex flex-col items-center w-full py-2 px-0 focus:outline-none transition-colors ${currentView === item.key
                            ? 'text-trust-blue bg-muted rounded-lg'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                    aria-label={item.label}
                >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default SidebarNav; 