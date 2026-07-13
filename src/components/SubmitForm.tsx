import React, { useState, useEffect } from 'react';
import { Community, TNLEASubmission } from '@/types';
import DisclaimerCard from './DisclaimerCard';
import { Loader2 } from 'lucide-react';

interface SubmitFormProps {
  initialData: Partial<TNLEASubmission> | null;
  onSubmit: (data: Omit<TNLEASubmission, 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export default function SubmitForm({ initialData, onSubmit }: SubmitFormProps) {
  const [admissionYear, setAdmissionYear] = useState<number>(initialData?.admissionYear || 2026);
  const [diplomaPercentage, setDiplomaPercentage] = useState<string>(initialData?.diplomaPercentage?.toString() || '');
  const [generalRank, setGeneralRank] = useState<string>(initialData?.generalRank?.toString() || '');
  const [community, setCommunity] = useState<Community>(initialData?.community || 'OC');
  const [communityRank, setCommunityRank] = useState<string>(initialData?.communityRank?.toString() || '');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update state when initialData loads (e.g. from Firebase)
  useEffect(() => {
    if (initialData) {
      setAdmissionYear(initialData.admissionYear || 2026);
      setDiplomaPercentage(initialData.diplomaPercentage?.toString() || '');
      setGeneralRank(initialData.generalRank?.toString() || '');
      setCommunity(initialData.community || 'OC');
      setCommunityRank(initialData.communityRank?.toString() || '');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const percentage = parseFloat(diplomaPercentage);
    const genRank = parseInt(generalRank, 10);
    const commRank = parseInt(communityRank, 10);

    // Validation
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      setError('Diploma percentage must be a valid number between 0 and 100.');
      return;
    }
    if (isNaN(genRank) || genRank <= 0 || !Number.isInteger(genRank)) {
      setError('General rank must be a positive integer.');
      return;
    }
    if (isNaN(commRank) || commRank <= 0 || !Number.isInteger(commRank)) {
      setError('Community rank must be a positive integer.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        admissionYear,
        diplomaPercentage: percentage,
        generalRank: genRank,
        community,
        communityRank: commRank
      });
      setSuccess('Your submission has been successfully recorded. Thank you for contributing to the TNLEA student community.');
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting your data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <DisclaimerCard />

      <div className="bg-white rounded-2xl border border-gray-200 shadow-soft p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {initialData ? 'Update Your Rank Details' : 'Submit Your Rank Details'}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm border border-red-100">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-800 p-4 rounded-xl mb-6 text-sm border border-green-100 font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="admissionYear" className="text-sm font-semibold text-gray-700">Admission Year</label>
              <select
                id="admissionYear"
                value={admissionYear}
                onChange={(e) => setAdmissionYear(parseInt(e.target.value, 10))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                required
              >
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
                <option value={2028}>2028</option>
                <option value={2029}>2029</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="diplomaPercentage" className="text-sm font-semibold text-gray-700">Diploma Percentage</label>
              <input
                id="diplomaPercentage"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={diplomaPercentage}
                onChange={(e) => setDiplomaPercentage(e.target.value)}
                placeholder="e.g. 92.11"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="generalRank" className="text-sm font-semibold text-gray-700">General Rank</label>
              <input
                id="generalRank"
                type="number"
                min="1"
                step="1"
                value={generalRank}
                onChange={(e) => setGeneralRank(e.target.value)}
                placeholder="e.g. 150"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="community" className="text-sm font-semibold text-gray-700">Community</label>
              <select
                id="community"
                value={community}
                onChange={(e) => setCommunity(e.target.value as Community)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                required
              >
                <option value="OC">OC</option>
                <option value="BC">BC</option>
                <option value="BCM">BCM</option>
                <option value="MBC/DNC">MBC/DNC</option>
                <option value="SC">SC</option>
                <option value="SCA">SCA</option>
                <option value="ST">ST</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="communityRank" className="text-sm font-semibold text-gray-700">Community Rank</label>
              <input
                id="communityRank"
                type="number"
                min="1"
                step="1"
                value={communityRank}
                onChange={(e) => setCommunityRank(e.target.value)}
                placeholder="e.g. 45"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Loader2 size={20} className="animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Post My Rank'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
