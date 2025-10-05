'use client';

/**
 * PersonalizationBox Component
 * 
 * A form-based UI that allows users to personalize their VibeScribe experience
 * by entering profile information. Data is saved to Supabase database.
 * 
 * Features:
 * - Simple form interface with all fields visible
 * - Optional fields (users can leave empty)
 * - Supabase database persistence
 * - Visual feedback on save
 * - Auto-load existing profile data
 */

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Sparkles, Camera, Twitter, Linkedin, FileText, User } from 'lucide-react';

type UserData = {
  full_name: string;
  instagram_username: string;
  twitter_username: string;
  linkedin_username: string;
  other_details: string;
};

const USER_ID_STORAGE_KEY = 'vibescribe_user_id';

// Get or create a unique user ID
const getUserId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let userId = localStorage.getItem(USER_ID_STORAGE_KEY);
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(USER_ID_STORAGE_KEY, userId);
  }
  return userId;
};

interface PersonalizationBoxProps {
  className?: string;
}

export default function PersonalizationBox({ className = '' }: PersonalizationBoxProps) {
  const [userId, setUserId] = useState<string>('');
  const [userData, setUserData] = useState<UserData>({
    full_name: '',
    instagram_username: '',
    twitter_username: '',
    linkedin_username: '',
    other_details: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Initialize user ID and load profile data on mount
  useEffect(() => {
    const initializeUser = async () => {
      const id = getUserId();
      setUserId(id);

      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch profile from Supabase
        const response = await fetch(`/api/profile?id=${id}`);
        const result = await response.json();

        if (response.ok && result.profile) {
          // Load existing profile data
          setUserData({
            full_name: result.profile.full_name || '',
            instagram_username: result.profile.instagram_username || '',
            twitter_username: result.profile.twitter_username || '',
            linkedin_username: result.profile.linkedin_username || '',
            other_details: result.profile.other_details || '',
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear save message when user starts typing
    if (saveMessage) {
      setSaveMessage(null);
    }
  };

  const handleSave = async () => {
    if (!userId) {
      setSaveMessage({ type: 'error', text: 'Unable to save: User ID not found' });
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          ...userData,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSaveMessage({ type: 'success', text: '✅ Saved successfully!' });
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSaveMessage(null);
        }, 3000);
      } else {
        setSaveMessage({ 
          type: 'error', 
          text: result.error || 'Failed to save. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage({ 
        type: 'error', 
        text: 'An error occurred. Please try again.' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!userId) {
      setSaveMessage({ type: 'error', text: 'Unable to delete: User ID not found' });
      return;
    }

    setIsDeleting(true);
    setSaveMessage(null);

    try {
      const response = await fetch(`/api/profile?id=${userId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        // Clear the form
        setUserData({
          full_name: '',
          instagram_username: '',
          twitter_username: '',
          linkedin_username: '',
          other_details: '',
        });
        setSaveMessage({ type: 'success', text: '✅ Profile deleted successfully!' });
        setShowDeleteConfirm(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSaveMessage(null);
        }, 3000);
      } else {
        setSaveMessage({ 
          type: 'error', 
          text: result.error || 'Failed to delete. Please try again.' 
        });
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      setSaveMessage({ 
        type: 'error', 
        text: 'An error occurred. Please try again.' 
      });
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`glass-effect rounded-2xl shadow-xl p-6 border-2 border-gray-700 ${className}`}>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mb-4"></div>
          <div className="text-gray-300 font-medium">Loading your profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-effect rounded-2xl shadow-xl p-6 md:p-8 border-2 border-gray-700 hover:shadow-2xl transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <Sparkles className="w-8 h-8 text-purple-400" />
        <h2 className="text-2xl font-bold text-gray-100">Personalization</h2>
      </div>
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
        Customize your VibeScribe experience. Add your details to get more personalized content. All fields are optional.
      </p>

      {/* Privacy Warning */}
      <div className="mb-6 p-4 bg-blue-900/20 border-2 border-blue-800 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-blue-300 font-medium leading-relaxed">
              <span className="font-bold">Privacy Notice:</span> These details will be saved for your future use and convenience. You can delete these details anytime using the delete button below.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
            <User className="w-4 h-4 text-purple-400" />
            <span>Full Name</span>
          </label>
          <input
            id="full_name"
            type="text"
            value={userData.full_name}
            onChange={(e) => handleInputChange('full_name', e.target.value)}
            placeholder="John Doe"
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] placeholder-gray-500"
          />
        </div>

        {/* Instagram Username */}
        <div>
          <label htmlFor="instagram_username" className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
            <Camera className="w-4 h-4 text-pink-400" />
            <span>Instagram</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">@</span>
            <input
              id="instagram_username"
              type="text"
              value={userData.instagram_username}
              onChange={(e) => handleInputChange('instagram_username', e.target.value)}
              placeholder="username"
              className="bg-[#222630] px-4 py-3 outline-none w-full pl-8 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] placeholder-gray-500"
            />
          </div>
        </div>

        {/* Twitter/X Username */}
        <div>
          <label htmlFor="twitter_username" className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
            <Twitter className="w-4 h-4 text-blue-400" />
            <span>Twitter/X</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">@</span>
            <input
              id="twitter_username"
              type="text"
              value={userData.twitter_username}
              onChange={(e) => handleInputChange('twitter_username', e.target.value)}
              placeholder="username"
              className="bg-[#222630] px-4 py-3 outline-none w-full pl-8 text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] placeholder-gray-500"
            />
          </div>
        </div>

        {/* LinkedIn Username */}
        <div>
          <label htmlFor="linkedin_username" className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
            <Linkedin className="w-4 h-4 text-blue-500" />
            <span>LinkedIn</span>
          </label>
          <input
            id="linkedin_username"
            type="text"
            value={userData.linkedin_username}
            onChange={(e) => handleInputChange('linkedin_username', e.target.value)}
            placeholder="username"
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] placeholder-gray-500"
          />
        </div>

        {/* Other Details */}
        <div>
          <label htmlFor="other_details" className="flex items-center gap-2 text-sm font-semibold text-gray-200 mb-2">
            <FileText className="w-4 h-4 text-green-400" />
            <span>About You</span>
          </label>
          <textarea
            id="other_details"
            value={userData.other_details}
            onChange={(e) => handleInputChange('other_details', e.target.value)}
            placeholder="Tell us about your interests, niche, or anything else that helps personalize your content..."
            rows={4}
            className="bg-[#222630] px-4 py-3 outline-none w-full text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040] resize-none placeholder-gray-500"
          />
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className={`p-4 rounded-xl font-medium text-sm animate-slide-in-up ${
            saveMessage.type === 'success' 
              ? 'bg-green-900/20 text-green-400 border-2 border-green-800' 
              : 'bg-red-900/20 text-red-400 border-2 border-red-800'
          }`}>
            {saveMessage.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <div className="flex-1 relative group">
            <button
              onClick={handleSave}
              disabled={isSaving || isDeleting}
              className="relative w-full inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              ></span>

              <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                <div className="relative z-10 flex items-center justify-center space-x-2">
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="font-bold">Saving...</span>
                    </>
                  ) : (
                    <>
                      <span className="transition-all duration-500 group-hover:translate-x-1 font-bold">💾 Save Profile</span>
                      <svg
                        className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          clipRule="evenodd"
                          d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </>
                  )}
                </div>
              </span>
            </button>
          </div>
          
          <div className="relative group">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isSaving || isDeleting}
              className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              title="Delete profile"
            >
              <span
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400 via-pink-500 to-red-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              ></span>

              <span className="relative z-10 block p-3 rounded-xl bg-gray-950">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl transform animate-slide-in-up border-2 border-gray-700">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-100 mb-2">Delete Profile?</h3>
              <p className="text-gray-300">
                This will permanently delete your profile data. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 relative group">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="relative w-full inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  ></span>

                  <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      <span className="transition-all duration-500 group-hover:translate-x-1 font-semibold">Cancel</span>
                    </div>
                  </span>
                </button>
              </div>

              <div className="flex-1 relative group">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="relative w-full inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400 via-pink-500 to-red-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  ></span>

                  <span className="relative z-10 block px-6 py-3 rounded-xl bg-red-950">
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      <span className="transition-all duration-500 group-hover:translate-x-1 font-semibold">
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </span>
                      {!isDeleting && (
                        <svg
                          className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            clipRule="evenodd"
                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
