import React from 'react';
import { Employee } from '../types';

interface StatsCardsProps {
  employees: Employee[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ employees }) => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const inactiveEmployees = employees.filter(e => e.status === 'inactive').length;
  const onLeaveEmployees = employees.filter(e => e.status === 'onleave').length;

  const stats = [
    {
      label: 'کل پرسنل',
      value: totalEmployees,
      icon: 'fa-users',
      color: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/20',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
    },
    {
      label: 'فعال',
      value: activeEmployees,
      icon: 'fa-user-check',
      color: 'from-green-500 to-emerald-600',
      shadow: 'shadow-green-500/20',
      bg: 'bg-green-500/10',
      text: 'text-green-400',
    },
    {
      label: 'غیرفعال',
      value: inactiveEmployees,
      icon: 'fa-user-times',
      color: 'from-red-500 to-rose-600',
      shadow: 'shadow-red-500/20',
      bg: 'bg-red-500/10',
      text: 'text-red-400',
    },
    {
      label: 'در مرخصی',
      value: onLeaveEmployees,
      icon: 'fa-user-clock',
      color: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/20',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fade-in">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="glass rounded-xl p-4 hover:scale-105 transition-all duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <i className={`fas ${stat.icon} ${stat.text}`}></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-slate-400 text-xs">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
