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

import { ChangeEvent,  useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useCreateOrderMutation } from "@/api/order-slice";
import { useGetProductsQuery } from "@/api/product-slice";


export function CreateOrder() {
  const [formValues, setFormValues] = useState<{
    userId: number;
    customerName: string;
    products: { productId: number; quantity: number; added: boolean, stock: number }[];
  }>({
    userId: 1,
    customerName: "",
    products: [{ productId: 0, quantity: 0, added: false, stock:0 }],
  });

  const [errors, setErrors] = useState<string[]>([]);

  const {data:products, isSuccess} = useGetProductsQuery({});

  const [createOrder, { isLoading: isCreating, error: createError }] = useCreateOrderMutation();

  
  
  const handleProductChange = (index: number, productId: string) => {
    if(products && isSuccess){
    const selectedProduct = products.find(product => product.productId.toString() === productId);
    const newProducts = [...formValues.products];
    newProducts[index].productId = parseInt(productId, 10);
    if (selectedProduct) {
      newProducts[index].stock = selectedProduct.quantity; 
    }
    setFormValues((prevValues) => ({ ...prevValues, products: newProducts }));
    clearError(index);
  }
  };
  

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
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
    newProducts.push({ productId: 0, quantity: 0, added: false, stock:0 });
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
    // console.log(submitValues);

    await createOrder(submitValues).unwrap();
      toast.success("Order Created Successfully!");
    
    if(createError){
      console.error(createError);
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
                    {isSuccess && products.map((product) => (
                      <SelectItem
                        key={product.productId}
                        value={product.productId.toString()}
                      >
                        {product.productName}
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
              max={product.stock} // set max to the product's stock
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
          disabled={isCreating}
        >
          {isCreating && <LoaderCircle className="animate-spin" />}
          {!isCreating && <div>Submit</div>}
          
        </Button>
      </CardContent>
    </Card>
  );
}
