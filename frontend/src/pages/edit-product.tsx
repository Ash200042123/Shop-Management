import { useGetProductQuery, useUpdateProductMutation } from "@/api/product-slice";
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
import { LoaderCircle } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


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

  const { data: product,isSuccess, isLoading: isFetching } = useGetProductQuery(productName);
  const [updateProduct,{isLoading}] = useUpdateProductMutation();

  const [errors, setErrors] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log(product);
    if (product && isSuccess && !isInitialized) {
      setFormValues({
        name: product.product.name,
        description: product.product.description,
        price: parseFloat(product.product.price),
        quantity: parseInt(product.product.stock),
      });
      setIsInitialized(true);
    }
  }, [product,isInitialized]);

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
      

      await updateProduct({name:productName, product: {
        updatedName: formValues.name,
        description: formValues.description,
        price: parseFloat(formValues.price.toString()),
        stock: parseInt(formValues.quantity.toString()),
      }}).unwrap();
      toast.success("Successfully Updated Product!");
      navigate(`/products/${formValues.name}`);
    } catch (error) {
      toast.error("Could not update product!");
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
      {isFetching && <LoaderCircle className="animate-spin mx-auto" />}
        {!isFetching && (<><div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading && <LoaderCircle className="animate-spin" />}
        {!isLoading && <div>Update Product</div>}
        </Button>
        </>)}
      </CardContent>
    </Card>
  );
}
