import React, { useState, useMemo } from 'react';
import { TNLEASubmission } from '@/types';
import { Search, ChevronDown, ChevronUp, Verified } from 'lucide-react';
import clsx from 'clsx';

interface RankingsTableProps {
  data: TNLEASubmission[];
}

type SortField = 'diplomaPercentage' | 'generalRank' | 'community' | 'communityRank' | 'admissionYear';
type SortOrder = 'asc' | 'desc';

export default function RankingsTable({ data }: RankingsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('generalRank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc'); // default ascending for new field
    }
  };

  const filteredAndSortedData = useMemo(() => {
    // 1. Filter
    let filtered = data;
    if (searchQuery) {
      const q = searchQuery.trim().toLowerCase();
      filtered = data.filter((item) => {
        // Build a searchable string that includes all relevant fields
        const searchable = `${item.community ?? ''} ${item.diplomaPercentage ?? ''} ${item.generalRank ?? ''} ${item.communityRank ?? ''} ${item.admissionYear ?? ''}`
          .toString()
          .toLowerCase();
        return searchable.includes(q);
      });
    }

    // 2. Sort
    return [...filtered].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle string comparison for community
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      
      // Numeric comparison
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [data, searchQuery, sortField, sortOrder]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <div className="w-4 h-4" />;
    return sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Community Rankings</h2>
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            placeholder="Search ranks, %, community..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80 backdrop-blur-sm">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('generalRank')}>
                  <div className="flex items-center gap-1">General Rank <SortIcon field="generalRank" /></div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('diplomaPercentage')}>
                  <div className="flex items-center gap-1">Diploma % <SortIcon field="diplomaPercentage" /></div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('community')}>
                  <div className="flex items-center gap-1">Community <SortIcon field="community" /></div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('communityRank')}>
                  <div className="flex items-center gap-1">Community Rank <SortIcon field="communityRank" /></div>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => handleSort('admissionYear')}>
                  <div className="flex items-center gap-1">Year <SortIcon field="admissionYear" /></div>
                </th>
                <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Verified
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredAndSortedData.length > 0 ? (
                filteredAndSortedData.map((row, idx) => (
                  <tr key={row.id || idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      #{row.generalRank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">
                      {row.diplomaPercentage}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className={clsx("px-2.5 py-1 rounded-full text-xs font-semibold", {
                        "bg-purple-100 text-purple-700": row.community === 'OC',
                        "bg-blue-100 text-blue-700": row.community === 'BC',
                        "bg-cyan-100 text-cyan-700": row.community === 'BCM',
                        "bg-orange-100 text-orange-700": row.community === 'MBC/DNC',
                        "bg-rose-100 text-rose-700": row.community === 'SC',
                        "bg-pink-100 text-pink-700": row.community === 'SCA',
                        "bg-amber-100 text-amber-700": row.community === 'ST',
                      })}>
                        {row.community}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      #{row.communityRank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.admissionYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center">
                      <Verified size={18} className="text-blue-500" title="Google Verified Submission" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No submissions found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
