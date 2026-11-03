import React from 'react';
import { Employee } from '../types';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const getStatusBadge = (status: Employee['status']) => {
  switch (status) {
    case 'active':
      return (
        <span className="badge bg-green-500/20 text-green-400 border border-green-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 ml-1.5"></span>
          فعال
        </span>
      );
    case 'inactive':
      return (
        <span className="badge bg-red-500/20 text-red-400 border border-red-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 ml-1.5"></span>
          غیرفعال
        </span>
      );
    case 'onleave':
      return (
        <span className="badge bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 ml-1.5"></span>
          در مرخصی
        </span>
      );
  }
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
  if (employees.length === 0) {
    return (
      <div className="glass rounded-xl p-12 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-inbox text-slate-500 text-3xl"></i>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">لیست پرسنل خالی است</h3>
        <p className="text-slate-400">برای شروع، پرسنل جدید ثبت کنید</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl overflow-hidden animate-fade-in">
      {/* Table Header */}
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fas fa-table text-blue-400"></i>
          <h3 className="text-white font-medium">لیست پرسنل</h3>
        </div>
        <span className="text-slate-400 text-sm">{employees.length} نفر</span>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-right text-slate-400 text-sm font-medium py-3 px-4">ردیف</th>
              <th className="text-right text-slate-400 text-sm font-medium py-3 px-4">نام و نام خانوادگی</th>
              <th className="text-right text-slate-400 text-sm font-medium py-3 px-4">کد پرسنلی</th>
              <th className="text-right text-slate-400 text-sm font-medium py-3 px-4">کد ملی</th>
              <th className="text-right text-slate-400 text-sm font-medium py-3 px-4">شماره تماس</th>
              <th className="text-right text-slate-400 text-sm font-medium py-3 px-4">دپارتمان</th>
              <th className="text-right text-slate-400 text-sm font-medium py-3 px-4">سمت</th>
              <th className="text-right text-slate-400 text-sm font-medium py-3 px-4">وضعیت</th>
              <th className="text-center text-slate-400 text-sm font-medium py-3 px-4">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id} className="border-b border-slate-700/30 table-row-hover transition-colors duration-200">
                <td className="py-3 px-4 text-slate-300 text-sm">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {emp.firstName[0]}{emp.lastName[0]}
                    </div>
                    <span className="text-white text-sm font-medium">{emp.firstName} {emp.lastName}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-300 text-sm font-mono">{emp.personnelCode}</td>
                <td className="py-3 px-4 text-slate-300 text-sm font-mono">{emp.nationalId}</td>
                <td className="py-3 px-4 text-slate-300 text-sm font-mono" dir="ltr">{emp.phone}</td>
                <td className="py-3 px-4 text-slate-300 text-sm">{emp.department}</td>
                <td className="py-3 px-4 text-slate-300 text-sm">{emp.position}</td>
                <td className="py-3 px-4">{getStatusBadge(emp.status)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(emp)}
                      className="w-8 h-8 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition-colors duration-200"
                      title="ویرایش"
                    >
                      <i className="fas fa-edit text-xs"></i>
                    </button>
                    <button
                      onClick={() => onDelete(emp.id)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors duration-200"
                      title="حذف"
                    >
                      <i className="fas fa-trash text-xs"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-700/30">
        {employees.map((emp, index) => (
          <div key={emp.id} className="p-4 table-row-hover transition-colors duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {emp.firstName[0]}{emp.lastName[0]}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{emp.firstName} {emp.lastName}</p>
                  <p className="text-slate-400 text-xs">کد: {emp.personnelCode}</p>
                </div>
              </div>
              {getStatusBadge(emp.status)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mb-3">
              <div className="flex items-center gap-1">
                <i className="fas fa-fingerprint text-slate-500"></i>
                <span>{emp.nationalId}</span>
              </div>
              <div className="flex items-center gap-1" dir="ltr">
                <i className="fas fa-phone text-slate-500"></i>
                <span>{emp.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="fas fa-building text-slate-500"></i>
                <span>{emp.department}</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="fas fa-briefcase text-slate-500"></i>
                <span>{emp.position}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(emp)}
                className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center justify-center gap-1"
              >
                <i className="fas fa-edit"></i>
                ویرایش
              </button>
              <button
                onClick={() => onDelete(emp.id)}
                className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-lg text-xs font-medium transition-colors duration-200 flex items-center justify-center gap-1"
              >
                <i className="fas fa-trash"></i>
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTable;
