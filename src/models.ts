export interface Category {
  id: string;
  name: string;
  products: Product[];
  imageId: string | null;
  image: Image | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  products: Product[];
  imageId: string | null;
  image: Image | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface Order {
  id: number;
  customerId: string;
  customer: Customer;
  isPaid: boolean;
  phone: string;
  address: string;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatus;
  totalOrderPrice: number;
}

export interface OrderItem {
  id: string;
  orderId: number;
  order: Order;
  productId: string;
  product: Product;
}

enum OrderStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  CANCELLED = "CANCELLED",
}

enum CustomStatus {
  ACTIVE = "ACTIVE",
  PASSIVE = "PASSIVE",
}
export interface Product {
  id: string;
  categoryId: string | null;
  category?: Category;
  brandId: string | null;
  brand?: Brand;
  name: string;
  codebar: string;
  price: number;
  discount?: number | null;
  stock: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  expirationAt?: Date | null;
  images: Image[];
  OrderItem: OrderItem[];
  rating?: number | null;
}

export interface Customer {
  id: string;
  phoneNumber: string;
  fisrtname: string;
  lastname: string;
  password: string;
  email?: string | null;
  address: string;
  imageId: string;
  image: Image;
  orders: Order[];
  createdAt: Date;
  updatedAt: Date;
  status: CustomStatus;
}
export interface Image {
  id: string;
  url: string;
  productId: string;
  product: Product;
  brand?: Brand;
  category?: Category;
  customer?: Customer;
}
