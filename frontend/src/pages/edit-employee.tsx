import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users2,
  PanelLeft,
  Search,
} from "lucide-react";

export function EditEmployee() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<{ email: string; name: string; role: string; unitsSold: number }>({
    email: "",
    name: "",
    role: "",
    unitsSold: 0,
  });
  


  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
        if (!backendUrl) {
          throw new Error("Backend URL is not defined");
        }
  
        const response = await axios.get(`${backendUrl}/user/${employeeId}`);
        const employee = response.data.user;
  
        setFormValues({
          email: employee.email,
          name: employee.name,
        role: employee.role,
        unitsSold: employee.unitsSold,
        });


      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
  
    fetchEmployee();
  }, [employeeId]);
  

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.email) {
      setErrors(["Email must not be empty."]);
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        throw new Error("Backend URL is not defined");
      }

      const response = await axios.put(`${backendUrl}/user/${employeeId}`, {
        email: formValues.email,
      });
      navigate(`/employees/${employeeId}`);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/40 p-4">
      <TooltipProvider>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              to="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Shop Management</span>
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/invoices"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Invoices</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Invoices</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/products"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/employees"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Employees</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Employees</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/sales"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Sales</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Sales</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    to="/"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Shop Management</span>
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    to="/invoices"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Invoices
                  </Link>
                  <Link
                    to="/products"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    Products
                  </Link>
                  <Link
                    to="/employees"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Users2 className="h-5 w-5" />
                    Employees
                  </Link>
                  <Link
                    to="/sales"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Sales
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/employees">Employees</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  Edit Email
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
            <div className="ml-auto flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="relative hover:bg-accent"
                  >
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="h-9"
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <Card className="mt-2 w-full p-6 shadow-md sm:mt-0 sm:p-8">
  <CardHeader className="space-y-1">
    <CardTitle className="text-2xl">Edit Employee</CardTitle>
    <CardDescription>
      Modify the employee details below.
    </CardDescription>
  </CardHeader>
  <CardContent className="grid gap-4">
    <div className="grid gap-2">
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        value={formValues.name}
        readOnly
        placeholder="Employee name"
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="role">Role</Label>
      <Input
        id="role"
        name="role"
        value={formValues.role}
        readOnly
        placeholder="Employee role"
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="unitsSold">Units Sold</Label>
      <Input
        id="unitsSold"
        name="unitsSold"
        value={formValues.unitsSold}
        readOnly
        placeholder="Units sold by the employee"
      />
    </div>
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        value={formValues.email}
        onChange={handleFieldChange}
        placeholder="Enter employee email"
      />
    </div>
    {errors.length > 0 && (
      <div className="text-red-500">
        {errors.map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </div>
    )}
    <Button onClick={handleSubmit}>Save</Button>
  </CardContent>
</Card>

        </div>
      </TooltipProvider>
    </div>
  );
}
