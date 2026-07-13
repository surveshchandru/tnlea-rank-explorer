import React from 'react';
import { Users, TrendingUp, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

interface StatsProps {
  totalStudents: number;
  highestPercentage: number;
  lowestGeneralRank: number;
  highestGeneralRank: number;
}

export default function StatisticsCards({ 
  totalStudents, 
  highestPercentage, 
  lowestGeneralRank, 
  highestGeneralRank 
}: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <StatCard 
        title="Total Students" 
        value={totalStudents.toLocaleString()} 
        icon={<Users size={20} className="text-blue-500" />} 
      />
      <StatCard 
        title="Highest Diploma %" 
        value={highestPercentage > 0 ? `${highestPercentage.toFixed(2)}%` : '-'} 
        icon={<TrendingUp size={20} className="text-emerald-500" />} 
      />
      <StatCard 
        title="Top General Rank" 
        value={lowestGeneralRank < Infinity ? lowestGeneralRank : '-'} 
        icon={<ArrowUpFromLine size={20} className="text-purple-500" />} 
      />
      <StatCard 
        title="Highest General Rank" 
        value={highestGeneralRank > 0 ? highestGeneralRank : '-'} 
        icon={<ArrowDownToLine size={20} className="text-amber-500" />} 
      />
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-soft flex items-center justify-between transition-transform hover:-translate-y-1 duration-300">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="bg-gray-50 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
}
