import { useState, useEffect } from 'react';
import { Employee, EmployeeFormData } from './types';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import StatsCards from './components/StatsCards';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';

function App() {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
  };

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleAddEmployee = (data: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setEmployees(prev => [newEmployee, ...prev]);
    setShowForm(false);
    showNotification('پرسنل جدید با موفقیت ثبت شد', 'success');
  };

  const handleUpdateEmployee = (data: EmployeeFormData) => {
    if (!editingEmployee) return;
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === editingEmployee.id ? { ...emp, ...data } : emp
      )
    );
    setEditingEmployee(null);
    setShowForm(false);
    showNotification('اطلاعات پرسنل با موفقیت ویرایش شد', 'success');
  };

  const handleDeleteEmployee = () => {
    if (!deletingId) return;
    setEmployees(prev => prev.filter(emp => emp.id !== deletingId));
    setShowDeleteModal(false);
    setDeletingId(null);
    showNotification('پرسنل با موفقیت حذف شد', 'info');
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const departments = [...new Set(employees.map(emp => emp.department))];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch =
      emp.firstName.includes(searchTerm) ||
      emp.lastName.includes(searchTerm) ||
      emp.personnelCode.includes(searchTerm) ||
      emp.nationalId.includes(searchTerm) ||
      emp.phone.includes(searchTerm);
    const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-in">
          <div className={`glass rounded-xl p-4 flex items-center gap-3 ${
            notification.type === 'success' ? 'border-green-500/30' :
            notification.type === 'error' ? 'border-red-500/30' : 'border-blue-500/30'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              notification.type === 'success' ? 'bg-green-500/20 text-green-400' :
              notification.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
            }`}>
              <i className={`fas ${
                notification.type === 'success' ? 'fa-check' :
                notification.type === 'error' ? 'fa-times' : 'fa-info'
              }`}></i>
            </div>
            <p className="text-white text-sm">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="glass rounded-2xl p-6 mb-6 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <i className="fas fa-users text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">سامانه ثبت نام پرسنل</h1>
              <p className="text-slate-400 text-sm mt-1">مدیریت اطلاعات کارکنان سازمان</p>
            </div>
          </div>
          <button
            onClick={() => { setEditingEmployee(null); setShowForm(true); }}
            className="bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
          >
            <i className="fas fa-plus"></i>
            <span>ثبت پرسنل جدید</span>
          </button>
        </div>
      </header>

      {/* Stats */}
      <StatsCards employees={employees} />

      {/* Search & Filter */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterDepartment={filterDepartment}
        setFilterDepartment={setFilterDepartment}
        departments={departments}
      />

      {/* Employee Table */}
      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form Modal */}
      {showForm && (
        <Modal onClose={() => { setShowForm(false); setEditingEmployee(null); }}>
          <EmployeeForm
            onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
            initialData={editingEmployee}
            isEditing={!!editingEmployee}
          />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal onClose={() => { setShowDeleteModal(false); setDeletingId(null); }}>
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-trash-alt text-red-400 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">حذف پرسنل</h3>
            <p className="text-slate-400 mb-6">آیا از حذف این پرسنل اطمینان دارید؟ این عملیات قابل بازگشت نیست.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleDeleteEmployee}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300"
              >
                بله، حذف شود
              </button>
              <button
                onClick={() => { setShowDeleteModal(false); setDeletingId(null); }}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300"
              >
                انصراف
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
