export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  personnelCode: string;
  nationalId: string;
  phone: string;
  email: string;
  department: string;
  position: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'onleave';
  createdAt: string;
}

export type EmployeeFormData = Omit<Employee, 'id' | 'createdAt'>;
