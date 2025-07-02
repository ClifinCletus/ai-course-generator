import React from "react";
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight} from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-violet-100 shadow-lg">
      <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-violet-200 transition-all duration-300">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              AI Course Generator
            </h1>
            <p className="text-xs text-gray-500">Powered by AI</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-violet-200 transition-all duration-300 transform hover:scale-105">
          Get Started
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </header>
  );
};

export default Header