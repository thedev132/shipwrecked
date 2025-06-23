'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import Link from 'next/link';
import Icon from '@hackclub/icons';
import { ReviewModeProvider, useReviewMode } from '../contexts/ReviewModeContext';
import ProjectStatus from '@/components/common/ProjectStatus';
import ReviewSection from '@/components/common/ReviewSection';
import ProjectClassificationBadge from '@/components/common/ProjectClassificationBadge';
import ProjectHistogramChart from '@/components/common/ProjectHistogramChart';
import UserClusterChart from '@/components/common/UserClusterChart';
import UserCategoryBadge from '@/components/common/UserCategoryBadge';
import { useMDXComponents } from '@/mdx-components';
import { lazy, Suspense } from 'react';
import { ensureHttps } from '@/lib/utils';

const MDXShippedApproval = lazy(() => import('./review-guidelines/shipped-approval.mdx'));
const MDXViralApproval = lazy(() => import('./review-guidelines/viral-approval.mdx'));
const MDXShipUpdateApproval = lazy(() => import('./review-guidelines/ship-update-approval.mdx'));
const MDXOther = lazy(() => import('./review-guidelines/other.mdx'));

function Loading() {
  return (
    <div className="fixed inset-0 bg-[url(/bay.webp)] bg-cover bg-center">
      <div className="relative flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-5xl md:text-6xl font-serif mb-6 text-white font-bold">
            Loading...
          </p>
        </div>
      </div>
    </div>
  )
}

function AccessDeniedHaiku() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start fade-in after mount
    const fadeTimer = setTimeout(() => setVisible(true), 10);
    // Redirect after 5 seconds
    const redirectTimer = setTimeout(() => {
      router.push('/bay/login');
    }, 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 bg-[url(/bay.webp)] bg-cover bg-center">
      <div className="relative flex items-center justify-center h-full">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 4s ease-in',
            display: 'inline-block'
          }}
          className="text-center"
        >
          <p className="text-5xl md:text-6xl font-serif mb-6 text-white font-bold">
            Stranded on the shore,
          </p>
          <p className="text-5xl md:text-6xl font-serif mb-6 text-white font-bold">
            Treasure lies beyond the waves,
          </p>
          <p className="text-5xl md:text-6xl font-serif text-white font-bold">
            Sign in to set sail.
          </p>
        </div>
      </div>
    </div>
  );
}

// Type definitions for review page
enum UserStatus {
  Unknown = "Unknown",
  L1 = "L1", 
  L2 = "L2",
  FraudSuspect = "FraudSuspect"
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  status: UserStatus;
}

interface Review {
  id: string;
  comment: string;
  createdAt: string;
  projectID: string;
  reviewerId: string;
  reviewer: User;
  reviewType?: string; // Optional for backward compatibility
}

interface Project {
  projectID: string;
  name: string;
  description: string;
  codeUrl: string;
  playableUrl: string;
  screenshot: string;
  hackatime: string;
  submitted: boolean;
  userId: string;
  viral: boolean;
  shipped: boolean;
  in_review: boolean;
  approved: boolean;
  user: User;
  reviews: Review[];
  userName: string | null;
  userEmail: string | null;
  userImage: string | null;
  userHackatimeId: string | null;
  latestReview: Review | null;
  reviewCount: number;
  rawHours: number;
  hoursOverride?: number;
  hackatimeLinks?: {
    id: string;
    hackatimeName: string;
    rawHours: number;
    hoursOverride?: number;
  }[];
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const reviewTypeLabels: Record<string, { label: string, color: string }> = {
    ShippedApproval: { label: 'Shipped', color: 'blue' },
    ViralApproval: { label: 'Viral', color: 'purple' },
    HoursApproval: { label: 'Ship Updates', color: 'green' },
    Other: { label: 'Other', color: 'gray' }
  };

  // Get the review type from the latest review or default to Other
  const reviewType = project.latestReview?.reviewType || 'Other';
  const { label, color } = reviewTypeLabels[reviewType] || reviewTypeLabels.Other;

  return (
    <div 
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className={`p-4 border-l-4 ${color === 'blue' ? 'border-l-blue-400' : color === 'purple' ? 'border-l-purple-400' : color === 'green' ? 'border-l-green-400' : 'border-l-gray-400'}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold truncate">{project.name}</h3>
          <span className={`text-xs ${
            color === 'blue' ? 'bg-blue-100 text-blue-800' : 
            color === 'purple' ? 'bg-purple-100 text-purple-800' : 
            color === 'green' ? 'bg-green-100 text-green-800' : 
            'bg-gray-100 text-gray-800'
          } rounded-full px-2 py-1`}>
            {label}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {project.userImage ? (
              <img 
                src={project.userImage} 
                alt={project.userName || ''} 
                className="w-6 h-6 rounded-full mr-2"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-300 mr-2 flex items-center justify-center">
                <span className="text-xs text-gray-600">
                  {project.userName?.charAt(0) || '?'}
                </span>
              </div>
            )}
            <span className="text-xs text-gray-600">{project.userName}</span>
          </div>
          
          <div className="text-xs text-gray-500">
            <span>Reviews: {project.reviewCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onClose, onReviewSubmitted }: { 
  project: Project; 
  onClose: () => void;
  onReviewSubmitted: () => void;
}) {
  const { isReviewMode } = useReviewMode();
  
  // Add debugging
  console.log('ProjectDetail selected project:', project);
  
  const [projectFlags, setProjectFlags] = useState({
    shipped: !!project.shipped,
    viral: !!project.viral,
    in_review: !!project.in_review,
    approved: !!project.approved,
  });
  
  // Handle project flag updates
  const handleFlagsUpdated = (updatedProject: any) => {
    setProjectFlags({
      shipped: !!updatedProject.shipped,
      viral: !!updatedProject.viral,
      in_review: !!updatedProject.in_review,
      approved: !!updatedProject.approved,
    });
    
    // If in_review was changed to false, notify the parent component to refresh the list
    if (project.in_review && !updatedProject.in_review) {
      onReviewSubmitted();
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
        <h2 className="text-xl font-bold">{project.name}</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <span className="sr-only">Close</span>
          <Icon glyph="view-close" size={24} />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
          <p className="text-base text-gray-900">{project.description || "No description provided."}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Created By</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {project.userImage ? (
                <img 
                  src={project.userImage} 
                  alt={project.userName || ''} 
                  className="w-8 h-8 rounded-full mr-2"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center">
                  <span className="text-sm text-gray-600">
                    {project.userName?.charAt(0) || '?'}
                  </span>
                </div>
              )}
              <span className="text-sm">{project.userName}</span>
            </div>
            <UserCategoryBadge userId={project.userId} size="small" showMetrics={true} />
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-center text-sm">
            <ProjectStatus 
              viral={projectFlags.viral} 
              shipped={projectFlags.shipped} 
              in_review={projectFlags.in_review}
            />
          </div>
        </div>
        
        {(project.codeUrl || project.playableUrl || project.userHackatimeId) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Links</h3>
            <div className="flex flex-col gap-2">
              {project.codeUrl && (
                <a 
                  href={ensureHttps(project.codeUrl)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  <Icon glyph="github" size={16} />
                  View Code Repository
                </a>
              )}
              {project.playableUrl && (
                <a 
                  href={ensureHttps(project.playableUrl)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  <Icon glyph="link" size={16} />
                  Try It Out
                </a>
              )}
              {project.userHackatimeId && (
                <button
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    const hackatimeUrl = `https://hackatime.hackclub.com/admin/timeline?date=${today}&user_ids=${project.userHackatimeId}`;
                    window.open(hackatimeUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="text-purple-600 hover:underline flex items-center gap-2 text-left"
                >
                  <Icon glyph="analytics" size={16} />
                  View Hackatime Timeline
                </button>
              )}
              {project.userHackatimeId && (
                <button
                  onClick={() => {
                    const impersonateButton = `https://hackatime.hackclub.com/impersonate/${project.userHackatimeId}`;
                    window.open(impersonateButton, '_blank', 'noopener,noreferrer');
                  }}
                  className="text-purple-600 hover:underline flex items-center gap-2 text-left"
                >
                  <Icon glyph="view" size={16} />
                  Impersonate User
                </button>
              )}
            </div>
          </div>
        )}
        
        {project.screenshot && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Screenshot</h3>
            <img 
              src={project.screenshot} 
              alt={`Screenshot of ${project.name}`}
              className="mt-2 rounded-lg max-w-full h-auto border border-gray-200"
            />
          </div>
        )}
        
        {/* Project Hours Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Project Hours</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600">
                  Raw Hours: <span className="font-semibold">{project.rawHours}h</span>
                </div>
                {project.hoursOverride !== undefined && project.hoursOverride !== null && (
                  <div className="text-sm text-gray-600">
                    Override: <span className="font-semibold text-blue-600">{project.hoursOverride}h</span>
                  </div>
                )}
                {project.hackatimeLinks && project.hackatimeLinks.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Total from {project.hackatimeLinks.length} Hackatime link(s)
                  </div>
                )}
              </div>
              <ProjectClassificationBadge
                hours={project.hoursOverride ?? project.rawHours}
                showPercentile={true}
                size="md"
              />
            </div>
          </div>
        </div>
        
        {/* Project Reviews Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <ReviewSection 
            projectID={project.projectID} 
            initialFlags={projectFlags}
            onFlagsUpdated={handleFlagsUpdated}
            rawHours={project.rawHours}
            hackatimeLinks={project.hackatimeLinks}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { enableReviewMode } = useReviewMode();
  const components = useMDXComponents({});
  
  // Add filter state
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // Auto-enable review mode when the component mounts
  useEffect(() => {
    enableReviewMode();
  }, [enableReviewMode]);

  // Fetch projects that are in review
  useEffect(() => {
    // Only fetch if authenticated - the layout will handle proper access control
    if (status === "authenticated") {
      fetchProjectsInReview();
    }
  }, [status]);
  
  // Apply filter when projects or filter changes
  useEffect(() => {
    if (activeFilter === "FraudSuspect") {
      setFilteredProjects(projects.filter(project => 
        project.user.status === UserStatus.FraudSuspect &&
        (project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()))
      ));
      return;
    }
    if (activeFilter) {
      setFilteredProjects(projects.filter(project => 
        project.latestReview?.reviewType === activeFilter &&
        project.user.status !== UserStatus.FraudSuspect &&
        (project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()))
      ));
      
    } else {
      setFilteredProjects(projects.filter(project => 
        project.user.status !== UserStatus.FraudSuspect &&
        (project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()))
      ));
    }
  }, [projects, activeFilter, searchTerm]);

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);
  
  // Function to fetch projects in review - moved outside useEffect for reusability
  const fetchProjectsInReview = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/review');
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects in review');
      }
      
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data); // Initialize filtered projects with all projects
    } catch (err) {
      console.error('Error fetching projects in review:', err);
      setError('Failed to load projects that need review. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle review submissions and refresh the project list
  const handleReviewSubmitted = () => {
    // Close the modal
    setSelectedProject(null);
    
    // Refresh the projects list
    fetchProjectsInReview();
    
    // Show toast
    toast.success("Review completed. Project removed from review list.");
  };

  // Render loading state
  if (status === "loading") {
    return <Loading />;
  }
  
  // Authentication and access control is now handled by the layout
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Project Review Dashboard</h1>
            <p className="text-gray-600">Review and provide feedback on submitted projects</p>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <ProjectHistogramChart />
          <UserClusterChart />
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Icon glyph="important" size={24} className="text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Filter buttons */}
        {!isLoading && projects.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeFilter === null
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('ShippedApproval')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeFilter === 'ShippedApproval'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Shipped Approval
              </button>
              <button
                onClick={() => setActiveFilter('ViralApproval')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeFilter === 'ViralApproval'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                Viral Approval
              </button>
              <button
                onClick={() => setActiveFilter('HoursApproval')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeFilter === 'HoursApproval'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Ship Updates
              </button>
              <button
                onClick={() => setActiveFilter('Other')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeFilter === 'Other'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Other Requests
              </button>
              <button
                onClick={() => setActiveFilter('FraudSuspect')}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeFilter === 'FraudSuspect'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                Banned Users
              </button>
            </div>
          </div>
        )}

        <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search project reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-3 text-gray-400">
              🔍
            </span>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-2">Loading projects...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full bg-white p-6 rounded-lg shadow text-center">
                <Icon glyph="checkmark" size={48} className="mx-auto text-green-500 mb-2" />
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {projects.length === 0 ? "All caught up!" : "No matching projects"}
                </h2>
                <p className="text-gray-600">
                  {projects.length === 0 
                    ? "There are no projects waiting for review at the moment." 
                    : "Try a different filter to see more projects."}
                </p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.projectID} 
                  project={project} 
                  onClick={() => setSelectedProject(project)}
                />
              ))
            )}
          </div>
        )}
        
        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 w-[100vw]">
            <div className="max-w-8xl h-full overflow-auto md:m-5">
              <div className="flex flex-col md:flex-row gap-4 h-full">
                {/* Guidelines panel from MDX file */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-1/2 h-1/3 md:h-full flex flex-col">
                  <div className="p-4 bg-gray-50 border-b flex-shrink-0">
                    <h2 className="text-xl font-bold">Review Guidelines</h2>
                  </div>
                  <div className="p-4 flex-grow overflow-hidden">
                    <div className="prose prose-sm max-w-none overflow-y-auto h-full">
                      <Suspense fallback={<div>Loading guidelines...</div>}>
                        {selectedProject.latestReview?.reviewType == 'ShippedApproval' && <MDXShippedApproval components={components} />}
                        {selectedProject.latestReview?.reviewType == 'ViralApproval' && <MDXViralApproval components={components} />}
                        {selectedProject.latestReview?.reviewType == 'HoursApproval' && <MDXShipUpdateApproval components={components} />}
                        {selectedProject.latestReview?.reviewType == 'Other' && <MDXOther components={components} />}
                      </Suspense>
                    </div>
                  </div>
                </div>
                
                {/* Project detail panel */}
                <div className="w-full md:w-1/2 h-2/3 md:h-full overflow-auto rounded-lg">
                  <ProjectDetail 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)}
                    onReviewSubmitted={handleReviewSubmitted}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster richColors />
    </div>
  );
}

export default function ReviewPageWithProvider() {
  return (
    <ReviewModeProvider>
      <ReviewPage />
    </ReviewModeProvider>
  );
} 
