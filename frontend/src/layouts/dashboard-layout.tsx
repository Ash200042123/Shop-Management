import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "@/utils/cookie-utils";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export function DashboardLayout() {
  const token = getCookie();
  const navigate = useNavigate();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleLogout = () => {
    removeCookie();
    navigate("/auth/login");
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const generateBreadcrumb = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter((segment) => segment !== "");
    let currentPath = "";
  
    console.log("Path Segments:", pathSegments);
  
    return (
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          currentPath += `/${segment}`;
          const isActive = currentPath === location.pathname;
  
          console.log(`Segment: ${segment}, Current Path: ${currentPath}, Is Active: ${isActive}`);
  
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isActive ? (
                  <span className="text-black">{segment.charAt(0).toUpperCase() + segment.slice(1)}</span>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={currentPath}>{segment.charAt(0).toUpperCase() + segment.slice(1)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    );
  };
  
  


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Toaster />
      <TooltipProvider>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              to="/"
              className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full ${
                isActiveLink("/") ? "bg-primary text-primary-foreground" : "bg-muted-foreground"
              } text-lg font-semibold md:h-8 md:w-8 md:text-base`}
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Shop Management</span>
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    isActiveLink("/") ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
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
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    isActiveLink("/invoices") ? "text-foreground" : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
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
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    isActiveLink("/products") ? "text-foreground" : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
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
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    isActiveLink("/employees") ? "text-foreground" : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
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
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    isActiveLink("/sales") ? "text-foreground" : "text-muted-foreground"
                  } transition-colors hover:text-foreground md:h-8 md:w-8`}
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
          <header className="sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
                    className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full ${
                      isActiveLink("/") ? "bg-primary text-primary-foreground" : "bg-muted-foreground"
                    } text-lg font-semibold md:text-base`}
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Shop Management</span>
                  </Link>
                  <Link
                    to="/"
                    className={`flex items-center gap-4 px-2.5 ${
                      isActiveLink("/") ? "text-muted-foreground hover:text-foreground" : "text-foreground"
                    }`}
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    to="/invoices"
                    className={`flex items-center gap-4 px-2.5 ${
                      isActiveLink("/invoices") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Invoices
                  </Link>
                  <Link
                    to="/products"
                    className={`flex items-center gap-4 px-2.5 ${
                      isActiveLink("/products") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Package className="h-5 w-5" />
                    Products
                  </Link>
                  <Link
                    to="/employees"
                    className={`flex items-center gap-4 px-2.5 ${
                      isActiveLink("/employees") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Users2 className="h-5 w-5" />
                    Employees
                  </Link>
                  <Link
                    to="/sales"
                    className={`flex items-center gap-4 px-2.5 ${
                      isActiveLink("/sales") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <LineChart className="h-5 w-5" />
                    Sales
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
              {generateBreadcrumb()}
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <img
                    src="/placeholder-user.jpg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button onClick={handleLogout}>Logout</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Outlet />
          </main>
        </div>
      </TooltipProvider>
    </div>
  );
}
