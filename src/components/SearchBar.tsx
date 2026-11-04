import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterDepartment: string;
  setFilterDepartment: (value: string) => void;
  departments: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  filterDepartment,
  setFilterDepartment,
  departments,
}) => {
  return (
    <div className="glass rounded-xl p-4 mb-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <i className="fas fa-search"></i>
          </div>
          <input
            type="text"
            placeholder="جستجو بر اساس نام، کد پرسنلی، کد ملی یا شماره تماس..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pr-10 pl-4 py-3 text-white placeholder-slate-500 focus:outline-none input-focus transition-all duration-300"
          />
        </div>

        {/* Department Filter */}
        <div className="relative min-w-[180px]">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <i className="fas fa-filter"></i>
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pr-10 pl-4 py-3 text-white appearance-none focus:outline-none input-focus transition-all duration-300 cursor-pointer"
          >
            <option value="all">همه دپارتمان‌ها</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <i className="fas fa-chevron-down text-xs"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
