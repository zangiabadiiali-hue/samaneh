import React, { useState, useEffect } from 'react';
import { Employee, EmployeeFormData } from '../types';

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => void;
  initialData: Employee | null;
  isEditing: boolean;
}

const departments = [
  'فناوری اطلاعات',
  'منابع انسانی',
  'مالی و حسابداری',
  'بازاریابی و فروش',
  'تولید',
  'پشتیبانی',
  'مدیریت',
  'تحقیق و توسعه',
];

const positions = [
  'مدیر',
  'سرپرست',
  'کارشناس',
  'کارشناس ارشد',
  'تکنسین',
  'اپراتور',
  'کارآموز',
  'مشاور',
];

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, initialData, isEditing }) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: '',
    lastName: '',
    personnelCode: '',
    nationalId: '',
    phone: '',
    email: '',
    department: '',
    position: '',
    hireDate: '',
    status: 'active',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        personnelCode: initialData.personnelCode,
        nationalId: initialData.nationalId,
        phone: initialData.phone,
        email: initialData.email,
        department: initialData.department,
        position: initialData.position,
        hireDate: initialData.hireDate,
        status: initialData.status,
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EmployeeFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'نام الزامی است';
    if (!formData.lastName.trim()) newErrors.lastName = 'نام خانوادگی الزامی است';
    if (!formData.personnelCode.trim()) newErrors.personnelCode = 'کد پرسنلی الزامی است';
    if (!formData.nationalId.trim()) newErrors.nationalId = 'کد ملی الزامی است';
    if (!formData.phone.trim()) newErrors.phone = 'شماره تماس الزامی است';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'ایمیل معتبر نیست';
    }
    if (!formData.department) newErrors.department = 'دپارتمان الزامی است';
    if (!formData.position) newErrors.position = 'سمت الزامی است';
    if (!formData.hireDate) newErrors.hireDate = 'تاریخ استخدام الزامی است';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (field: keyof EmployeeFormData) =>
    `w-full bg-slate-800/50 border ${errors[field] ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none input-focus transition-all duration-300`;

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <i className={`fas ${isEditing ? 'fa-edit' : 'fa-user-plus'} text-blue-400`}></i>
        </div>
        <h2 className="text-xl font-bold text-white">
          {isEditing ? 'ویرایش اطلاعات پرسنل' : 'ثبت پرسنل جدید'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="block text-slate-300 text-sm mb-2">
            <i className="fas fa-user text-blue-400 ml-1"></i> نام
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="نام"
            className={inputClass('firstName')}
          />
          {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-slate-300 text-sm mb-2">
            <i className="fas fa-user text-blue-400 ml-1"></i> نام خانوادگی
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="نام خانوادگی"
            className={inputClass('lastName')}
          />
          {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
        </div>

        {/* Personnel Code */}
        <div>
          <label className="block text-slate-300 text-sm mb-2">
            <i className="fas fa-id-badge text-blue-400 ml-1"></i> کد پرسنلی
          </label>
          <input
            type="text"
            value={formData.personnelCode}
            onChange={(e) => handleChange('personnelCode', e.target.value)}
            placeholder="کد پرسنلی"
            className={inputClass('personnelCode')}
          />
          {errors.personnelCode && <p className="text-red-400 text-xs mt-1">{errors.personnelCode}</p>}
        </div>

        {/* National ID */}
        <div>
          <label className="block text-slate-300 text-sm mb-2">
            <i className="fas fa-fingerprint text-blue-400 ml-1"></i> کد ملی
          </label>
          <input
            type="text"
            value={formData.nationalId}
            onChange={(e) => handleChange('nationalId', e.target.value)}
            placeholder="کد ملی ۱۰ رقمی"
            maxLength={10}
            className={inputClass('nationalId')}
          />
          {errors.nationalId && <p className="text-red-400 text-xs mt-1">{errors.nationalId}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-slate-300 text-sm mb-2">
            <i className="fas fa-phone text-blue-400 ml-1"></i> شماره تماس
          </label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            className={inputClass('phone')}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-slate-300 text-sm mb-2">
            <i className="fas fa-envelope text-blue-400 ml-1"></i> ایمیل
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="example@email.com"
            className={inputClass('email')}
            dir="ltr"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Department */}
        <div>
          <label className="block text-slate-300 text-sm mb-2">
            <i className="fas fa-building text-blue-400 ml-1"></i> دپارتمان
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleChange('department', e.target.value)}
            className={`${inputClass('department')} appearance-none cursor-pointer`}
          >
            <option value="">انتخاب دپارتمان</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && <p className="text-red-400 text-xs mt-1">{errors.department}</p>}
        </div>

        {/* Position */}
        <div>
          <label className="block text-slate-300 text-sm mb-2">
            <i className="fas fa-briefcase text-blue-400 ml-1"></i> سمت
          </label>
          <select
            value={formData.position}
            onChange={(e) => handleChange('position', e.target.value)}
            className={`${inputClass('position')} appearance-none cursor-pointer`}
          >
            <option value="">انتخاب سمت</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
          {errors.position && <p className="text-red-400 text-xs mt-1">{errors.position}</p>}
        </div>

        {/* Hire Date */}
        <div>
          <label className="block text-slate-300 text-sm mb-2">
            <i className="fas fa-calendar text-blue-400 ml-1"></i> تاریخ استخدام
          </label>
          <input
            type="date"
            value={formData.hireDate}
            onChange={(e) => handleChange('hireDate', e.target.value)}
            className={inputClass('hireDate')}
          />
          {errors.hireDate && <p className="text-red-400 text-xs mt-1">{errors.hireDate}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-slate-300 text-sm mb-2">
            <i className="fas fa-toggle-on text-blue-400 ml-1"></i> وضعیت
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value as 'active' | 'inactive' | 'onleave')}
            className={`${inputClass('status')} appearance-none cursor-pointer`}
          >
            <option value="active">فعال</option>
            <option value="inactive">غیرفعال</option>
            <option value="onleave">در مرخصی</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 flex items-center justify-center gap-2"
        >
          <i className={`fas ${isEditing ? 'fa-save' : 'fa-plus'}`}></i>
          {isEditing ? 'ذخیره تغییرات' : 'ثبت پرسنل'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
