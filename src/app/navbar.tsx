'use client'
import React, { useState } from 'react';
import { Store, Eye, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlipWords } from '@/components/ui/flip-words';

interface NavItemProps {
  icon: React.ElementType;
  text: string;
}

interface NavItemProps {
  icon: React.ElementType;
  text: string;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, text, href }) => (
  <motion.a
    href={href}
    className="flex items-center space-x-2 text-purple-300 hover:text-purple-100 transition-colors duration-200"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </motion.a>
);

interface MobileNavItemProps {
  icon: React.ElementType;
  text: string;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ icon: Icon, text, onClick }) => (
  <motion.a
    href={`#${text.toLowerCase()}`}
    className="flex items-center space-x-4 text-purple-300 hover:text-purple-100 transition-colors duration-200 py-2"
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <Icon className="w-6 h-6" />
    <span className="text-lg">{text}</span>
  </motion.a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full relative z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div><FlipWords words={["ZenChain","Focus", "Earn", "Evolve"]} duration={1000} className='text-purple-400 text-2xl font-bold'/></div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavItem icon={Eye} text="Focus" href="/zenchain"/>
          <NavItem icon={Store} text="Zensphere" href="/zensphere"/>
          
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-purple-300 hover:text-purple-100 transition-colors duration-200"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-purple-800 py-4 px-4"
          >
            <div className="flex flex-col space-y-4">
              <MobileNavItem icon={Store} text="Marketplace" onClick={toggleMenu} />
              <MobileNavItem icon={Eye} text="Focus" onClick={toggleMenu} />
             
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;