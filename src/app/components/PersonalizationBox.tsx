'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaStar, FaCamera, FaTwitter, FaLinkedin, FaFileAlt, FaUser, FaBriefcase, FaProjectDiagram, FaBullseye, FaLink, FaPalette, FaSave, FaTrash } from 'react-icons/fa';
import { UserProfile } from '@/lib/types';

const USER_ID_STORAGE_KEY = 'vibescribe_user_id';

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
  profile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
  className?: string;
}

export default function PersonalizationBox({ profile, onSave, className = '' }: PersonalizationBoxProps) {
  const [userId, setUserId] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [styleKeywords, setStyleKeywords] = useState<string>('');
  const [sourceUrl, setSourceUrl] = useState<string>('');
  const [instagramUsername, setInstagramUsername] = useState<string>('');
  const [twitterUsername, setTwitterUsername] = useState<string>('');
  const [linkedinUsername, setLinkedinUsername] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const id = getUserId();
    setUserId(id);
  }, []);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setRole(profile.role || '');
      setProjectName(profile.project_name || '');
      setProjectDescription(profile.project_description || '');
      setTargetAudience(profile.target_audience || '');
      setStyleKeywords(profile.style_keywords || '');
      setSourceUrl(profile.source_url || '');
      setInstagramUsername(profile.instagram_username || '');
      setTwitterUsername(profile.twitter_username || '');
      setLinkedinUsername(profile.linkedin_username || '');
    }
  }, [profile]);

  const handleSaveClick = () => {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const newProfile: UserProfile = {
        id: userId,
        full_name: fullName,
        role: role,
        project_name: projectName,
        project_description: projectDescription,
        target_audience: targetAudience,
        style_keywords: styleKeywords,
        source_url: sourceUrl,
        instagram_username: instagramUsername,
        twitter_username: twitterUsername,
        linkedin_username: linkedinUsername,
      };
      onSave(newProfile);
      setSaveMessage({ type: 'success', text: ' Saved successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    setSaveMessage(null);
    try {
      const response = await fetch(`/api/profile?id=${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete profile');
      }

      // Clear all form fields
      setFullName('');
      setRole('');
      setProjectName('');
      setProjectDescription('');
      setTargetAudience('');
      setStyleKeywords('');
      setSourceUrl('');
      setInstagramUsername('');
      setTwitterUsername('');
      setLinkedinUsername('');

      setSaveMessage({ type: 'success', text: 'Profile deleted successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting profile:', error);
      setSaveMessage({ type: 'error', text: 'Failed to delete profile. Please try again.' });
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='glass-effect rounded-2xl shadow-xl p-6 md:p-8 space-y-6 transition-all duration-300'>
      <div className='flex items-center gap-3 mb-3'>
        <FaStar className='w-8 h-8 text-[var(--accent)]' />
        <h2 className='text-2xl font-bold text-[var(--text-primary)]'>Personalization</h2>
      </div>
      <p className='text-[var(--text-secondary)] mb-6 text-sm leading-relaxed'>
        Customize your VibeScribe experience. All fields are optional.
      </p>
      <div className='space-y-6'>
        <div>
          <label className='flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2'>
            <FaUser className='w-4 h-4 text-[var(--accent)]' />
            <span>Full Name</span>
          </label>
          <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='John Doe' className='bg-[var(--content)] px-4 py-3 outline-none w-full text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 placeholder-[var(--text-secondary)]' />
        </div>
        <div>
          <label className='flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2'>
            <FaBriefcase className='w-4 h-4 text-[var(--accent)]' />
            <span>Role/Title</span>
          </label>
          <input type='text' value={role} onChange={(e) => setRole(e.target.value)} placeholder='Content Creator' className='bg-[var(--content)] px-4 py-3 outline-none w-full text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 placeholder-[var(--text-secondary)]' />
        </div>
        <div>
          <label className='flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2'>
            <FaProjectDiagram className='w-4 h-4 text-[var(--accent)]' />
            <span>Project Name</span>
          </label>
          <input type='text' value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder='Your brand name' className='bg-[var(--content)] px-4 py-3 outline-none w-full text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 placeholder-[var(--text-secondary)]' />
        </div>
        <div>
          <label className='flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2'>
            <FaFileAlt className='w-4 h-4 text-[var(--accent)]' />
            <span>Project Description</span>
          </label>
          <textarea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder='Describe your project...' rows={3} className='bg-[var(--content)] px-4 py-3 outline-none w-full text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 resize-none placeholder-[var(--text-secondary)]' />
        </div>
        <div>
          <label className='flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2'>
            <FaBullseye className='w-4 h-4 text-[var(--accent)]' />
            <span>Target Audience</span>
          </label>
          <input type='text' value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder='Young professionals' className='bg-[var(--content)] px-4 py-3 outline-none w-full text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 placeholder-[var(--text-secondary)]' />
        </div>
        <div>
          <label className='flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2'>
            <FaPalette className='w-4 h-4 text-[var(--accent)]' />
            <span>Style Keywords</span>
          </label>
          <textarea value={styleKeywords} onChange={(e) => setStyleKeywords(e.target.value)} placeholder='professional, witty' rows={2} className='bg-[var(--content)] px-4 py-3 outline-none w-full text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 resize-none placeholder-[var(--text-secondary)]' />
        </div>
        <div>
          <label className='flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2'>
            <FaLink className='w-4 h-4 text-[var(--accent)]' />
            <span>Source URL</span>
          </label>
          <input type='url' value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder='https://example.com' className='bg-[var(--content)] px-4 py-3 outline-none w-full text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 placeholder-[var(--text-secondary)]' />
        </div>
        <div>
          <label className='flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2'>
            <FaCamera className='w-4 h-4 text-[var(--accent)]' />
            <span>Instagram</span>
          </label>
          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] font-medium'>@</span>
            <input type='text' value={instagramUsername} onChange={(e) => setInstagramUsername(e.target.value)} placeholder='username' className='bg-[var(--content)] px-4 py-3 outline-none w-full pl-8 text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 placeholder-[var(--text-secondary)]' />
          </div>
        </div>
        <div>
          <label className='flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2'>
            <FaTwitter className='w-4 h-4 text-[var(--accent)]' />
            <span>Twitter/X</span>
          </label>
          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] font-medium'>@</span>
            <input type='text' value={twitterUsername} onChange={(e) => setTwitterUsername(e.target.value)} placeholder='username' className='bg-[var(--content)] px-4 py-3 outline-none w-full pl-8 text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 placeholder-[var(--text-secondary)]' />
          </div>
        </div>
        <div>
          <label className='flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-2'>
            <FaLinkedin className='w-4 h-4 text-[var(--accent)]' />
            <span>LinkedIn</span>
          </label>
          <input type='text' value={linkedinUsername} onChange={(e) => setLinkedinUsername(e.target.value)} placeholder='username' className='bg-[var(--content)] px-4 py-3 outline-none w-full text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 placeholder-[var(--text-secondary)]' />
        </div>
        {saveMessage && (
          <div className={saveMessage.type === 'success' ? 'bg-green-900/20 text-green-400 border border-green-800 p-4 rounded-xl font-medium text-sm' : 'bg-red-900/20 text-red-400 border border-red-800 p-4 rounded-xl font-medium text-sm'}>
            {saveMessage.text}
          </div>
        )}
        <div className='flex gap-3'>
          <button onClick={handleSaveClick} disabled={isSaving} className='flex-1 bg-[var(--accent)] text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
            {isSaving ? <span>Saving...</span> : <><FaSave className='w-4 h-4' /><span>Save Profile</span></>}
          </button>
          <button onClick={() => setShowDeleteModal(true)} disabled={isSaving || isDeleting} className='bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
            <FaTrash className='w-4 h-4' />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-[var(--content)] rounded-2xl border border-red-500/30 p-6 md:p-8 max-w-md w-full shadow-2xl'>
            <h3 className='text-2xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2'>
              <FaTrash className='text-red-500' />
              Delete Profile?
            </h3>
            <p className='text-[var(--text-secondary)] mb-6'>
              Are you sure you want to delete your profile? This action cannot be undone and will remove all your personalization data.
            </p>
            <div className='flex gap-3'>
              <button onClick={() => setShowDeleteModal(false)} disabled={isDeleting} className='flex-1 bg-[var(--background)] hover:opacity-80 text-[var(--text-primary)] font-bold py-3 px-6 rounded-xl transition-opacity disabled:opacity-50 disabled:cursor-not-allowed border border-[var(--border)]'>
                Cancel
              </button>
              <button onClick={handleDeleteClick} disabled={isDeleting} className='flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
                {isDeleting ? <span>Deleting...</span> : <><FaTrash className='w-4 h-4' /><span>Delete</span></>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
