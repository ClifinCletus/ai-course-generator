import { Button } from '@/components/ui/button';
import  { Zap, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br max-sm:pt-15 from-slate-50 via-white to-violet-50 relative overflow-hidden pt-5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-8 animate-bounce">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Learning Revolution
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              AI Course Generator
            </span>
            <br />
            <span className="text-slate-800 text-4xl md:text-5xl">
              Custom Learning Paths
            </span>
            <br />
            <span className="text-slate-600 text-3xl md:text-4xl font-normal">
              Powered by Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transform your learning experience with AI-driven course creation. 
            Build personalized educational journeys that adapt to your goals, 
            pace, and learning style for maximum impact.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-violet-300 transition-all duration-300 transform hover:scale-105 group">
              Start Creating Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};


export default Hero