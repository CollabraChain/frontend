'use client'
import React, { useState } from 'react';
import ChatList from '@/components/ChatList';
import ProjectChat from '@/components/ProjectChat';
import ProjectDetails from '@/components/ProjectDetails';
import ActivityFeed from '@/components/ActivityFeed';
import UserProfile from '@/components/profile/UserProfile';
import { Header } from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import SidebarNav from '@/components/SidebarNav';
import { AnimatePresence, motion } from 'framer-motion';
import AIAgentChatRoom from '@/components/chat/AIAgentChatRoom';

export default function Demo() {
    const [currentView, setCurrentView] = useState<'list' | 'chat' | 'details' | 'activity' | 'profile' | 'ai-agent'>('list');
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    const handleChatSelect = (chatId: string) => {
        if (chatId === 'ai-agent') {
            setCurrentView('ai-agent');
            setSelectedChatId(null);
        } else {
            setSelectedChatId(chatId);
            setTimeout(() => {
                setCurrentView('chat');
            }, 150);
        }
    };

    const handleBackToList = () => {
        setTimeout(() => {
            setCurrentView('list');
            setSelectedChatId(null);
        }, 150);
    };

    return (
        <div className="h-screen bg-background flex flex-col">
            <Header />

            <div className="flex-1 overflow-hidden">
                {/* Desktop Layout with SidebarNav */}
                <div className="h-full w-full max-w-7xl mx-auto flex flex-row bg-background">
                    {/* Sidebar Navigation for Desktop */}
                    <div className="hidden lg:flex flex-col justify-start items-center bg-card border-r border-border" style={{ width: 80, minWidth: 80 }}>
                        <SidebarNav currentView={currentView} setCurrentView={(view) => setCurrentView(view as typeof currentView)} />
                        {/* AI Agent Button */}
                        <button
                            className={`mt-4 p-2 rounded-full ${currentView === 'ai-agent' ? 'bg-trust-blue text-white' : 'bg-neutral-200 text-neutral-700'}`}
                            title="AI Agent"
                            onClick={() => setCurrentView('ai-agent')}
                        >
                            🤖
                        </button>
                    </div>

                    {/* Main Content Area - Only show selected view */}
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                        {currentView === 'list' && (
                            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl h-full flex flex-col">
                                <h2 className="text-2xl font-semibold mb-6">Chats</h2>
                                <div className="flex-1 overflow-y-auto">
                                    {/* AI Agent Chat Entry */}
                                    <div
                                        className={`cursor-pointer flex items-center gap-3 p-4 mb-2 rounded-lg transition-colors ${selectedChatId === 'ai-agent' ? 'bg-trust-blue/10' : 'hover:bg-accent/50'}`}
                                        onClick={() => handleChatSelect('ai-agent')}
                                    >
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-trust-blue/20 to-trust-blue/10">
                                            <span className="text-2xl">🤖</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-sm truncate pr-2 text-trust-blue">AI Agent (CollabraChain)</h3>
                                            <p className="text-xs text-muted-foreground truncate">Chat with your AI assistant</p>
                                        </div>
                                    </div>
                                    <ChatList selectedChatId={selectedChatId} onChatSelect={handleChatSelect} />
                                </div>
                            </div>
                        )}
                        {currentView === 'ai-agent' && (
                            <div className="w-full h-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                                <AIAgentChatRoom />
                            </div>
                        )}
                        {currentView === 'chat' && (
                            <div className="hidden lg:flex w-full h-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
                                {/* Left: Chat List */}
                                <div className="w-1/3 min-w-[260px] max-w-[340px] border-r border-border flex flex-col">
                                    <div className="p-6 border-b border-border">
                                        <h2 className="text-xl font-semibold">Messages</h2>
                                    </div>
                                    <div className="flex-1 overflow-y-auto">
                                        {/* AI Agent Chat Entry */}
                                        <div
                                            className={`cursor-pointer flex items-center gap-3 p-4 mb-2 rounded-lg transition-colors ${selectedChatId === 'ai-agent' ? 'bg-trust-blue/10' : 'hover:bg-accent/50'}`}
                                            onClick={() => handleChatSelect('ai-agent')}
                                        >
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-trust-blue/20 to-trust-blue/10">
                                                <span className="text-2xl">🤖</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-sm truncate pr-2 text-trust-blue">AI Agent (CollabraChain)</h3>
                                                <p className="text-xs text-muted-foreground truncate">Chat with your AI assistant</p>
                                            </div>
                                        </div>
                                        <ChatList selectedChatId={selectedChatId} onChatSelect={handleChatSelect} />
                                    </div>
                                </div>
                                {/* Right: Conversation */}
                                <div className="flex-1 flex flex-col">
                                    {selectedChatId ? (
                                        <ProjectChat selectedChatId={selectedChatId} onBackToList={handleBackToList} isTransitioning={false} />
                                    ) : (
                                        <div className="flex-1 flex items-center justify-center text-muted-foreground text-lg">
                                            Select a conversation to start chatting
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Fallback for mobile or if not in desktop mode */}
                        {currentView === 'ai-agent' && (
                            <div className="lg:hidden bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl h-full flex flex-col">
                                <AIAgentChatRoom />
                            </div>
                        )}
                        {currentView === 'chat' && (
                            <div className="lg:hidden bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl h-full flex flex-col">
                                <h2 className="text-2xl font-semibold mb-6">Messages</h2>
                                <div className="flex-1 overflow-y-auto">
                                    <ProjectChat selectedChatId={selectedChatId} onBackToList={handleBackToList} isTransitioning={false} />
                                </div>
                            </div>
                        )}
                        {currentView === 'activity' && (
                            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl h-full flex flex-col">
                                <h2 className="text-2xl font-semibold mb-6">Activity</h2>
                                <div className="flex-1 overflow-y-auto">
                                    <ActivityFeed />
                                </div>
                            </div>
                        )}
                        {currentView === 'details' && (
                            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl h-full flex flex-col">
                                <h2 className="text-2xl font-semibold mb-6">Project Details</h2>
                                <div className="flex-1 overflow-y-auto">
                                    <ProjectDetails />
                                </div>
                            </div>
                        )}
                        {currentView === 'profile' && (
                            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl h-full flex flex-col">
                                <h2 className="text-2xl font-semibold mb-6">Profile</h2>
                                <div className="flex-1 overflow-y-auto">
                                    <UserProfile />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Mobile Views with Framer Motion transitions */}
                <div className="lg:hidden h-[calc(100vh-113px)] relative overflow-hidden">
                    <AnimatePresence initial={false} mode="wait">
                        {currentView === 'list' && (
                            <motion.div
                                key="list"
                                initial={{ x: '-100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '100%', opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="absolute inset-0"
                            >
                                <div className="bg-card rounded-lg shadow-sm p-4 h-full flex flex-col">
                                    <h2 className="text-lg font-semibold mb-4">Chats</h2>
                                    <div className="flex-1 overflow-y-auto">
                                        {/* AI Agent Chat Entry */}
                                        <div
                                            className={`cursor-pointer flex items-center gap-3 p-4 mb-2 rounded-lg transition-colors ${selectedChatId === 'ai-agent' ? 'bg-trust-blue/10' : 'hover:bg-accent/50'}`}
                                            onClick={() => handleChatSelect('ai-agent')}
                                        >
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-trust-blue/20 to-trust-blue/10">
                                                <span className="text-2xl">🤖</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-sm truncate pr-2 text-trust-blue">AI Agent (CollabraChain)</h3>
                                                <p className="text-xs text-muted-foreground truncate">Chat with your AI assistant</p>
                                            </div>
                                        </div>
                                        <ChatList selectedChatId={selectedChatId} onChatSelect={handleChatSelect} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {currentView === 'ai-agent' && (
                            <motion.div
                                key="ai-agent"
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '-100%', opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="absolute inset-0"
                            >
                                <div className="bg-card rounded-lg shadow-sm p-4 h-full flex flex-col">
                                    <AIAgentChatRoom />
                                </div>
                            </motion.div>
                        )}
                        {currentView === 'chat' && (
                            <motion.div
                                key="chat"
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '-100%', opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="absolute inset-0"
                            >
                                <div className="bg-card rounded-lg shadow-sm p-4 h-full flex flex-col">
                                    <h2 className="text-lg font-semibold mb-4">Messages</h2>
                                    <div className="flex-1 overflow-y-auto">
                                        <ProjectChat selectedChatId={selectedChatId} onBackToList={handleBackToList} isTransitioning={false} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {currentView === 'activity' && (
                            <motion.div
                                key="activity"
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '-100%', opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="absolute inset-0"
                            >
                                <div className="bg-card rounded-lg shadow-sm p-4 h-full flex flex-col">
                                    <h2 className="text-lg font-semibold mb-4">Activity</h2>
                                    <div className="flex-1 overflow-y-auto">
                                        <ActivityFeed />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {currentView === 'details' && (
                            <motion.div
                                key="details"
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '-100%', opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="absolute inset-0"
                            >
                                <div className="bg-card rounded-lg shadow-sm p-4 h-full flex flex-col">
                                    <h2 className="text-lg font-semibold mb-4">Project Details</h2>
                                    <div className="flex-1 overflow-y-auto">
                                        <ProjectDetails />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {currentView === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '-100%', opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="absolute inset-0"
                            >
                                <div className="bg-card rounded-lg shadow-sm p-4 h-full flex flex-col">
                                    <h2 className="text-lg font-semibold mb-4">Profile</h2>
                                    <div className="flex-1 overflow-y-auto">
                                        <UserProfile />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <BottomNav currentView={currentView} setCurrentView={(view) => setCurrentView(view as typeof currentView)} />
        </div>
    );
};

