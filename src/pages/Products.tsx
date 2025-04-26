
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getAllMangoes } from '@/utils/mangoDB';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Products = () => {
  const mangoes = getAllMangoes();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  
  const filteredMangoes = mangoes.filter(mango => 
    mango.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mango.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedMangoes = [...filteredMangoes].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-mango-yellow/20 py-16 mt-16">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl font-bold text-mango-green text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Premium Mangoes
          </motion.h1>
          <motion.p 
            className="text-lg text-center text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our selection of high-quality mangoes, each with a unique flavor profile. 
            All mangoes come in convenient 8kg packaging for your enjoyment.
          </motion.p>
        </div>
      </div>
      
      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-8 grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="search">Search Products</Label>
              <Input 
                id="search"
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sort">Sort By</Label>
              <Select 
                value={sortOption} 
                onValueChange={setSortOption}
              >
                <SelectTrigger id="sort" className="mt-1">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedMangoes.map((mango, index) => (
              <motion.div 
                key={mango.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (index % 3) }}
              >
                <ProductCard product={mango} />
              </motion.div>
            ))}
          </div>
          
          {sortedMangoes.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Products;
