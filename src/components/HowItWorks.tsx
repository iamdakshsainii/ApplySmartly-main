
import { Settings, Rocket, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Settings className="h-12 w-12" />,
      title: "Setup Your Profile",
      description: "Create your profile and upload your resume. Our AI will optimize it for better results.",
      step: "01"
    },
    {
      icon: <Rocket className="h-12 w-12" />,
      title: "Automate Applications",
      description: "Set your preferences and let our system apply to relevant jobs automatically.",
      step: "02"
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Track & Improve",
      description: "Monitor your application status and get insights to improve your success rate.",
      step: "03"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How it Works?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in three simple steps and transform your job search experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                {step.step}
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600">Automate Job</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Applications
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
