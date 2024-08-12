import { File, MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { toast } from "sonner";
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from "@/api/employee-slice";

export function Employees() {
  const {data:employees,isSuccess,isError,error} =useGetEmployeesQuery({});
  const [accessDenied, setAccessDenied] = useState<boolean>(false);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const componentRef = useRef(null);

  useEffect(() => {
    if(isError && error){
      setAccessDenied(true);
    }
  }, [isSuccess]);

  const handleDelete = async (id: number) => {
    try {
       await deleteEmployee(id);
       toast.success("Employee Deleted")
    } catch (error) {
      console.log(error);
      toast.error("Could not delete employee")
    }
  };


  if (accessDenied) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 border border-red-400 rounded-lg bg-red-100">
          <h1 className="text-xl font-semibold text-red-600">
            You don't have access to this page
          </h1>
        </div>
      </div>
    );
  }

  
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          
          <ReactToPrint
              trigger={() => {
                return <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>;
              }}
              content={()=>componentRef.current}
              documentTitle="All Employees"
              pageStyle="print"
              onAfterPrint={()=>{toast.success("Employees List printed!")}}
            />
          <Link to="/employees/add">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Employee
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0" ref={componentRef}>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
            <CardDescription>
              Manage your employees and view their sales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Total Units Sold
                  </TableHead>

                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isSuccess && employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        alt="Employee Image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src="/placeholder.svg"
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      {employee.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {employee.role}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {employee.unitsSold}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>

                          <DropdownMenuItem>
                            <Link to={`/employees/${employee.id}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              handleDelete(employee.id);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
