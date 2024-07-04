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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { getCookie } from "@/utils/cookie-utils";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";


export function CreateOrder() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<{
    userId: string;
    customerName: string;
    products: { productId: number; quantity: number; added: boolean }[];
  }>({
    userId: "",
    customerName: "",
    products: [{ productId: 0, quantity: 0, added: false }],
  });
  const token = getCookie();
  const [errors, setErrors] = useState<string[]>([]);
  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) {
          throw new Error("Backend URL is not defined");
        }
        const response = await axios.get(`${backendUrl}/products`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
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
    setLoading(true);
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
        submitValues,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success("Order Created Successfully!");
    } catch (error) {
      toast.error("Error Creating Product!");
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  return (
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
                    onValueChange={(value) => handleProductChange(index, value)}
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
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
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
          disabled={loading}
        >
          {loading && <LoaderCircle className="animate-spin" />}
          {!loading && <div>Submit</div>}
          
        </Button>
      </CardContent>
    </Card>
  );
}
