interface Order {
  id: string;
  userId:string;
  customerName: string;
  employeeName: string;
  status: string;
  orderDate: string;
  orderTotal: string; 
  products: Product[]; 
}

