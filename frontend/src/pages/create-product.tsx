import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCookie } from "@/utils/cookie-utils";

import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";


export function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<{
    name: string;
    description: string;
    price: number;
    quantity: number;
  }>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });
  const token = getCookie();
  const [errors, setErrors] = useState<string[]>([]);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    
    if (formValues.price <= 0 || formValues.quantity <= 0) {
      setErrors(["Price and Quantity must be greater than 0."]);
      return;
    }
    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        throw new Error("Backend URL is not defined");
      }

      const response = await axios.post(`${backendUrl}/add-product`, {
        name: formValues.name,
        description: formValues.description,
        price: formValues.price,
        stock: formValues.quantity,
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success("Product Created Successfully!");
    } catch (error) {
      toast.error("Could not create product!");
      console.error("Error creating product:", error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
        <CardDescription>
          Fill out the form below to create a new product.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleFieldChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formValues.description}
              onChange={(e) => handleFieldChange(e)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formValues.price.toString()}
              onChange={handleFieldChange}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={formValues.quantity.toString()}
              onChange={handleFieldChange}
              min="0"
            />
          </div>
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
