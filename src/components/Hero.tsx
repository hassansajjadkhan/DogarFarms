
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          filter: "brightness(0.85)"
        }}
      ></div>
      
      {/* Yellow to green gradient overlay */}
      <div className="absolute inset-0 hero-gradient opacity-60"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white text-shadow mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Taste The Sweet Mango <span className="text-mango-yellow">Sensation</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white mb-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Premium quality mangoes delivered fresh from our farms to your doorstep. 
            Experience the juicy sweetness of Pakistan's finest mangoes.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/products">
              <Button className="bg-mango-yellow text-white hover:bg-mango-orange px-8 py-6 text-lg btn-hover">
                Shop Now
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-mango-green px-8 py-6 text-lg btn-hover">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Floating mangoes decoration */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-mango-yellow rounded-full opacity-30"></div>
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-mango-lightgreen rounded-full opacity-20"></div>
    </div>
  );
};

export default Hero;
