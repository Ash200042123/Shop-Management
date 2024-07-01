import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Link } from "react-router-dom";
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

export function CreateOrder() {
  const [formValues, setFormValues] = useState<{
    userId: string;
    customerName: string;
    products: { productId: number; quantity: number; added: boolean }[];
  }>({
    userId: "",
    customerName: "",
    products: [{ productId: 0, quantity: 0, added: false }],
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) {
          throw new Error("Backend URL is not defined");
        }
        const response = await axios.get(`${backendUrl}/products`);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleProductChange = (index: number, productId: string) => {
    const newProducts = [...formValues.products];
    newProducts[index].productId = parseInt(productId, 10); // Convert productId to integer
    setFormValues((prevValues) => ({ ...prevValues, products: newProducts }));
    clearError(index);
  };

  const handleQuantityChange = (index: number, quantity: string) => {
    const newProducts = [...formValues.products];
    newProducts[index].quantity = parseInt(quantity);
    setFormValues((prevValues) => ({ ...prevValues, products: newProducts }));
    clearError(index);
  };

  const handleAddProduct = (index: number) => {
    const currentProduct = formValues.products[index];
    if (!currentProduct.productId || currentProduct.quantity <= 0) {
      setErrors((prevErrors) => [
        ...prevErrors,
        `Please select a product for row ${index + 1}.`,
      ]);
      return;
    }

    const newProducts = [...formValues.products];
    newProducts[index].added = true;
    newProducts.push({ productId: 0, quantity: 0, added: false });
    setFormValues((prevValues) => ({ ...prevValues, products: newProducts }));
  };

  const clearError = (index: number) => {
    setErrors((prevErrors) =>
      prevErrors.filter((error) => !error.includes(`row ${index + 1}`))
    );
  };

  const handleSubmit = async () => {
    const filteredProducts = formValues.products.filter(
      (product) => product.added
    );
    const submitValues = {
      ...formValues,
      products: filteredProducts.map(({ added, ...rest }) => rest),
    };
    console.log(submitValues);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        throw new Error("Backend URL is not defined");
      }

      const response = await axios.post(
        `${backendUrl}/create-order`,
        submitValues
      );
      console.log(response);
    } catch (error) {
      console.log(error);
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
                  to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
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
                    to="/"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Orders
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
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create Order</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
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
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 space-y-4 p-4 pt-2 sm:p-8">
            <Card>
              <CardHeader>
                <CardTitle>Create Order</CardTitle>
                <CardDescription>
                  Fill out the form below to create a new order.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={formValues.customerName}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userId">User ID</Label>
                    <Input
                      id="userId"
                      name="userId"
                      value={formValues.userId}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  {formValues.products.map((product, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4">
                      <div className="col-span-4">
                        <Label htmlFor={`product-${index}`}>Product</Label>
                        <div id={`product-${index}`}>
                          <Select
                            value={product.productId.toString()} 
                            onValueChange={(value) =>
                              handleProductChange(index, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Products</SelectLabel>
                                {products.map((product) => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id.toString()} 
                                  >
                                    {product.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                        <Input
                          id={`quantity-${index}`}
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          min={1}
                        />
                      </div>
                      <div className="col-span-2 flex items-end">
                        <Button
                          onClick={() => handleAddProduct(index)}
                          disabled={product.added}
                          className="w-full"
                        >
                          {product.added ? "Added" : "Add"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.length > 0 && (
                  <div className="text-red-500">
                    {errors.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
                <Button
                  onClick={handleSubmit}
                  className="flex justify-center items-center w-1/2 mx-auto"
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </TooltipProvider>
    </div>
  );
}
