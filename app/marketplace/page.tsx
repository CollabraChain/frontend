'use client'
import React from 'react';
import { Header } from '@/components/Header';
import ProjectFilters from '@/components/marketplace/ProjectFilters';
import ProjectGrid from '@/components/marketplace/ProjectGrid';
import SearchBar from '@/components/marketplace/SearchBar';
import { useMarketplace } from '@/components/marketplace/useMarketplace';
import { Toaster } from '@/components/ui/toaster';

export default function Marketplace() {
    const {
        projects,
        filteredProjects,
        filters,
        searchQuery,
        isLoading,
        updateFilters,
        updateSearchQuery,
        applyToProject
    } = useMarketplace();

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Browse Projects</h1>
                    <p className="text-muted-foreground">
                        Discover exciting projects and collaborate with amazing clients
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        <ProjectFilters
                            filters={filters}
                            onFiltersChange={updateFilters}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="mb-6">
                            <SearchBar
                                searchQuery={searchQuery}
                                onSearchChange={updateSearchQuery}
                                resultCount={filteredProjects.length}
                            />
                        </div>

                        <ProjectGrid
                            projects={filteredProjects}
                            isLoading={isLoading}
                            onApplyToProject={applyToProject}
                        />
                    </div>
                </div>
            </div>

            <Toaster />
        </div>
    );
};

