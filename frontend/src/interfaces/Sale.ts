interface Sale {
    id: number;
    userId: number;
    productId: number;
    productName: string;
    totalPrice: number;
    saleDate: Date;
    quantity: number;
  }
  
  
  interface SalesSummary {
    productName: string;
    totalUnitsSold: number;
    totalPrice: number;
  }