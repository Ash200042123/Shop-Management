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
import { Link } from "lucide-react";
import { ChangeEvent, useState } from "react";

export function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      //   const backendUrl = import.meta.env.VITE_BACKEND_URL;

      //   if (!backendUrl) {
      //     throw new Error("Backend URL is not defined");
      //   }
      const response = await axios.post(
        // backendUrl+ "/signup",
        "http://localhost:3000/api/login",
        {
          email: formValues.email,
          password: formValues.password,
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formValues.email}
                onChange={handleFieldChange}
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={formValues.password}
                onChange={handleFieldChange}
                name="password"
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
