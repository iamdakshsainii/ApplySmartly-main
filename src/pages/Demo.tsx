
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, CheckCircle, Clock, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ApplySmart
              </span>
            </div>

            <Button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Demo Video Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            See ApplySmart in Action
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Watch how ApplySmart revolutionizes your job search with intelligent automation and personalized applications.
          </p>

          {/* Video Player Placeholder */}
          <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-2xl mb-8">
            <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center text-white z-10">
                <Play className="h-20 w-20 mx-auto mb-4 opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
                <p className="text-xl mb-2">ApplySmart Demo Video</p>
                <p className="text-gray-300">Click to play (3:45)</p>
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-bounce">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
              <Target className="w-6 h-6 text-blue-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Demo Features */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What You'll See in the Demo
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Play className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                One-Click Applications
              </h3>
              <p className="text-gray-600 leading-relaxed">
                See how you can apply to multiple jobs with just one click, with personalized cover letters and optimized resumes for each position.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Smart Job Matching
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Watch our AI analyze job requirements and match them with your skills, experience, and preferences for the perfect fit.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Application Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learn how to track all your applications in one dashboard, with real-time updates and insights to improve your success rate.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Job Search?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have accelerated their careers with ApplySmart.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-medium"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/')}
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-medium"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
