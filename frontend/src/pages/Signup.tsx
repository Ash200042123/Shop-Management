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
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export function Signup() {

  const [formValues, setFormValues] = useState({
    fullName: "",
    role: "Employee",
    email: "",
    password: "",
  });

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      role: value,
    }));
  };

  const handleSubmit = async () => {
    try {
    //   const backendUrl = import.meta.env.VITE_BACKEND_URL;

    //   if (!backendUrl) {
    //     throw new Error("Backend URL is not defined");
    //   }
      const response = await axios.post(
        // backendUrl+ "/signup", 
        "http://localhost:3000/api/signup",
        {
        name: formValues.fullName,
        email: formValues.email,
        password: formValues.password,
        role: formValues.role,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Max Robinson"
                value={formValues.fullName}
                onChange={handleFieldChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Role</Label>
              <Select
                name="role"
                value={formValues.role}
                onValueChange={handleRoleChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formValues.email}
                onChange={handleFieldChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleFieldChange}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Create an account
            </Button>
            {/* <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
