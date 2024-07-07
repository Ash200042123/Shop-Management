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
import { ChangeEvent, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


export function EditEmployee() {
  const [loading, setLoading] = useState(false);
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const token = getCookie();

  const [formValues, setFormValues] = useState<{
    email: string;
    name: string;
    role: string;
    unitsSold: number;
  }>({
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

        const response = await axios.get(`${backendUrl}/user/${employeeId}`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
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
    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        throw new Error("Backend URL is not defined");
      }

      const response = await axios.put(`${backendUrl}/user/${employeeId}`, {
        email: formValues.email,
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success("Successfully Updated Employee!");
      navigate(`/employees/${employeeId}`);
    } catch (error) {
      toast.error("Could not update employee!");
      console.error("Error updating employee:", error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Card className="mt-2 w-full p-6 shadow-md sm:mt-0 sm:p-8">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Edit Employee</CardTitle>
        <CardDescription>Modify the employee details below.</CardDescription>
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
        <Button onClick={handleSubmit} disabled={loading}>
          {loading && <LoaderCircle className="animate-spin" />}
        {!loading && <div>Submit</div>}
        </Button>
      </CardContent>
    </Card>
  );
}
