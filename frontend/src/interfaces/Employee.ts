enum Role {
    Employee = "Employee",
    Manager = "Manager",
    Admin = "Admin",
  }
  

  interface User {
    id: number;
    email: string;
    password: string;
    name?: string;
    role: Role;
    unitsSold: number;
  }