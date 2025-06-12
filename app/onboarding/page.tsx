'use client';
import React, { useState } from 'react';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { onboardingScreens } from '@/config/onboardingScreens';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

const Onboarding = () => {
    const router = useRouter();
    const [isCompleted, setIsCompleted] = useState(false);

    const {
        isConnected,
    } = useAccount();

    const handleComplete = () => {
        setIsCompleted(true);
    };

    if (isCompleted || isConnected) {
        // redirect to dashboard after 3 seconds
        setTimeout(() => {
            router.push('/demo');
        }, 1000);
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-energy-green/10 rounded-full flex items-center justify-center mx-auto">
                        <div className="w-8 h-8 bg-energy-green rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold">Welcome aboard!</h2>
                    <p className="text-muted-foreground">Redirecting to your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <OnboardingProvider totalScreens={onboardingScreens.length}>
            <OnboardingFlow onComplete={handleComplete} />
        </OnboardingProvider>
    );
};

export default Onboarding;
