
import { Zap, FileText, Filter, Target, Clock, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "One-Click Apply",
      description: "Apply faster with pre-filled applications across companies.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart Resume Builder",
      description: "Auto-fill your resume using AI and enhance your profile.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <Filter className="h-8 w-8" />,
      title: "Intelligent Filters",
      description: "Let the platform recommend jobs tailored to your profile.",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Application Tracking",
      description: "Track all your applications in one centralized dashboard.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-time Updates",
      description: "Get instant notifications about application status changes.",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy Protected",
      description: "Your data is encrypted and securely stored with us.",
      gradient: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What We Do!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to accelerate your job search and maximize your success rate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-gray-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
