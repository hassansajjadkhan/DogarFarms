
import { User } from "./mangoDB";

export interface OrderDetails {
  productName: string;
  quantity: number;
  price: number;
  total: number;
  orderDate: string;
}

export const sendWhatsAppMessage = (user: User, order: OrderDetails) => {
  // Format the message
  const message = `
*NEW ORDER*
----------------------------------
*Customer Details:*
Name: ${user.name}
Email: ${user.email}
Phone: ${user.mobile}
Address: ${user.address}
City: ${user.city}
Postal Code: ${user.postalCode}

*Order Details:*
Product: ${order.productName}
Quantity: ${order.quantity} (8kg boxes)
Price per box: Rs. ${order.price}
Total Amount: Rs. ${order.total}
Order Date: ${order.orderDate}
----------------------------------
  `;

  // Encode the message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message);
  
  // WhatsApp number (without any spaces or special characters)
  const whatsappNumber = '+923183291985';
  
  // Generate the WhatsApp URL
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
  
  return true;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
