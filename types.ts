export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'ramo' | 'caja' | 'centro' | 'funeral';
  image: string;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface MessageRequest {
  occasion: string;
  recipient: string;
  tone: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface User {
  name: string;
  email: string;
  role: 'client' | 'admin';
}

export interface OrderDetails {
  fullName: string;
  address: string;
  phone: string;
  deliveryDate: string;
  dedication?: string;
  deliveryMethod?: 'shipping' | 'pickup';
  paymentMethod?: 'card' | 'cash';
}

export interface Order {
  id: string;
  date: string;
  status: 'pendiente' | 'entregado' | 'cancelado';
  total: number;
  customer: User;
  details: OrderDetails;
  items: CartItem[];
}