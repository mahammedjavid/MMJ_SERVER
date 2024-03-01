interface UploadToS3Params {
  buffer: Buffer;
  originalname: string;
  fileType: string;
}
interface CsvFile {
  buffer: Buffer;
}
interface ShipmentAttributes {
  shipment_date: Date;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
}
export interface AddressAttributes {
  user_id: number;
  add_type: string;
  add_one: string;
  add_two?: string | null;
  state?: string | null;
  city?: string | null;
  pincode?: number | null;
}
interface ProductAttributes {
  category_id: string;
  product_title: string;
  product_other_info?: string | null;
  product_images: string;
  SKU: string;
  product_description?: string | null;
  price: number;
  stock: number;
  isActive: Boolean;
}
interface WishlistAttributes {
  product_id: number;
  customer_id: number;
}
interface PaymentAttributes {
  user_id: number;
  order_id: number;
  payment_date: Date;
  payment_method: string;
  amount: number;
}

interface OrderItemAttributes {
  quantity: number;
  price: number;
}

interface OrderAttributes {
  order_date: Date;
  total_price: number;
}
interface UserAttributes {
  mobile_number: string;
  email?: string | null;
  last_name?: string | null;
}
interface CartAttributes {
  quantity: number;
  product_id: number;
  customer_id: number;
}
interface CategoryAttributes {
  category_name: string;
  category_image: string;
}
interface BulkUploadAttributes {
  user_id: number;
  fileName: string;
  fileLink: string;
  message: string;
}
interface orderItem {
  product_id : string,
  quantity : number
} 
export { UploadToS3Params, CsvFile , ProductAttributes, UserAttributes , orderItem  };
