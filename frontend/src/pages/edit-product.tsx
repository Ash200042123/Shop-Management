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

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";


export function EditProduct() {
  const { productName } = useParams();
  const navigate = useNavigate();

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

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl) {
          throw new Error("Backend URL is not defined");
        }

        const response = await axios.get(
          `${backendUrl}/products/${productName}`
        );
        const product = response.data.product;

        setFormValues({
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.stock,
        });

        console.log(product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productName]);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    if (formValues.price <= 0 || formValues.quantity <= 0) {
      setErrors(["Price and Quantity must be greater than 0."]);
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        throw new Error("Backend URL is not defined");
      }

      const response = await axios.put(
        `${backendUrl}/products/${productName}`,
        {
          updatedName: formValues.name,
          description: formValues.description,
          price: formValues.price,
          stock: formValues.quantity,
        }
      );
      // console.log(response);
      navigate(`/products/${formValues.name}`);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
        <CardDescription>Update product details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleFieldChange}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formValues.price}
              onChange={handleFieldChange}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            type="text"
            value={formValues.description}
            onChange={handleFieldChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={formValues.quantity}
            onChange={handleFieldChange}
          />
        </div>
        {errors.length > 0 && (
          <ul className="text-red-500">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <Button onClick={handleSubmit}>Update Product</Button>
      </CardContent>
    </Card>
  );
}
