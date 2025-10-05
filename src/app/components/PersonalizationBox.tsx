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
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Personalization Box</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Customize your VibeScribe experience by adding your details below. All fields are optional.
      </p>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="full_name"
            type="text"
            value={userData.full_name}
            onChange={(e) => handleInputChange('full_name', e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Instagram Username */}
        <div>
          <label htmlFor="instagram_username" className="block text-sm font-medium text-gray-700 mb-1">
            Instagram Username
          </label>
          <input
            id="instagram_username"
            type="text"
            value={userData.instagram_username}
            onChange={(e) => handleInputChange('instagram_username', e.target.value)}
            placeholder="@username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Twitter/X Username */}
        <div>
          <label htmlFor="twitter_username" className="block text-sm font-medium text-gray-700 mb-1">
            Twitter/X Username
          </label>
          <input
            id="twitter_username"
            type="text"
            value={userData.twitter_username}
            onChange={(e) => handleInputChange('twitter_username', e.target.value)}
            placeholder="@username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* LinkedIn Username */}
        <div>
          <label htmlFor="linkedin_username" className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Username
          </label>
          <input
            id="linkedin_username"
            type="text"
            value={userData.linkedin_username}
            onChange={(e) => handleInputChange('linkedin_username', e.target.value)}
            placeholder="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Other Details */}
        <div>
          <label htmlFor="other_details" className="block text-sm font-medium text-gray-700 mb-1">
            Other Details
          </label>
          <textarea
            id="other_details"
            value={userData.other_details}
            onChange={(e) => handleInputChange('other_details', e.target.value)}
            placeholder="Tell us about your interests, niche, or anything else..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex-1">
            {saveMessage && (
              <div className={`text-sm font-medium ${
                saveMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {saveMessage.text}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isSaving || isDeleting}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || isDeleting}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-md"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Profile?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your profile? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
