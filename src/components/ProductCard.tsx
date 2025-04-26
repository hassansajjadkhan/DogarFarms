
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Mango } from '@/utils/mangoDB';

interface ProductCardProps {
  product: Mango;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-mango-yellow text-white px-2 py-1 text-xs font-bold">
          {product.weight}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-mango-green flex justify-between items-center">
          {product.name}
          <span className="text-mango-yellow">Rs. {product.price}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="bg-mango-lightgreen/20 text-mango-green text-xs px-2 py-1 rounded-full">
            {product.origin}
          </span>
          <span className="bg-mango-yellow/20 text-mango-orange text-xs px-2 py-1 rounded-full">
            {product.season}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/products/${product.id}`} className="w-full">
          <Button className="bg-mango-green hover:bg-mango-lightgreen text-white w-full btn-hover">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
