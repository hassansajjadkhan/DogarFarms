import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getMangoById, getCurrentUser } from '@/utils/mangoDB';
import { sendWhatsAppMessage, formatDate } from '@/utils/whatsapp';
import AuthModal from './AuthModal';
import { toast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState(getMangoById(id || ''));
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const user = getCurrentUser();
    setIsLoggedIn(!!user);
    
    if (id) {
      const productDetails = getMangoById(id);
      if (!productDetails) {
        navigate('/products');
      } else {
        setProduct(productDetails);
      }
    }
  }, [id, navigate]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };
  
  const handleOrderNow = () => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      return;
    }
    
    const user = getCurrentUser();
    if (user && product) {
      const orderDetails = {
        productName: product.name,
        quantity: quantity,
        price: product.price,
        total: quantity * product.price,
        orderDate: formatDate(new Date())
      };
      
      sendWhatsAppMessage(user, orderDetails);
      
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been sent via WhatsApp. We'll contact you soon to confirm.",
      });
    }
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <Alert className="bg-mango-yellow/20">
          <AlertTitle>Product not found</AlertTitle>
          <AlertDescription>
            The product you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button 
            onClick={() => navigate('/products')}
            className="bg-mango-green text-white hover:bg-mango-lightgreen"
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="container mx-auto px-4 py-8 mt-20 relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 z-10"
          onClick={() => navigate('/products')}
        >
          <X className="h-6 w-6 text-mango-green hover:text-mango-yellow" />
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-mango-green">{product.name}</h1>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-mango-yellow">Rs. {product.price}</span>
              <span className="ml-2 text-gray-500">per {product.weight} box</span>
            </div>
            
            <p className="text-gray-600">{product.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <h3 className="text-sm text-mango-green font-medium">Origin</h3>
                  <p className="text-gray-600">{product.origin}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h3 className="text-sm text-mango-green font-medium">Season</h3>
                  <p className="text-gray-600">{product.season}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h3 className="text-sm text-mango-green font-medium">Taste</h3>
                  <p className="text-gray-600">{product.taste}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h3 className="text-sm text-mango-green font-medium">Weight</h3>
                  <p className="text-gray-600">{product.weight}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="pt-4 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-1/3">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={handleQuantityChange}
                  />
                </div>
                <div className="w-2/3 flex items-end">
                  <p className="text-gray-600">
                    Total: <span className="font-bold text-mango-green">Rs. {(quantity * product.price).toLocaleString()}</span>
                  </p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-mango-yellow hover:bg-mango-orange text-white py-6 btn-hover"
                onClick={handleOrderNow}
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <AuthModal 
        open={authModalOpen} 
        setOpen={setAuthModalOpen}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
};

export default ProductDetail;
