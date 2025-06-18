
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    desired_job_role: '',
    desired_location: '',
    job_experience: '',
    expected_salary: '',
    current_salary_range: '',
    skills: '',
    availability: '',
    remote_preference: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchOnboardingData();
  }, [user, navigate]);

  const fetchOnboardingData = async () => {
    try {
      const { data, error } = await supabase
        .from('user_onboarding')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setFormData({
          full_name: data.full_name || '',
          desired_job_role: data.desired_job_role || '',
          desired_location: data.desired_location || '',
          job_experience: data.job_experience || '',
          expected_salary: data.expected_salary || '',
          current_salary_range: data.current_salary_range || '',
          skills: data.skills ? data.skills.join(', ') : '',
          availability: data.availability || '',
          remote_preference: data.remote_preference || ''
        });
        setCurrentStep(data.current_step || 1);
      }
    } catch (error) {
      console.error('Error fetching onboarding data:', error);
    }
  };

  const updateOnboardingData = async (stepData: any, step: number) => {
    try {
      setLoading(true);

      const updateData = {
        ...stepData,
        current_step: step,
        completed_steps: Array.from(new Set([...Array(step).keys()].map(i => i + 1))),
        user_id: user?.id
      };

      if (stepData.skills && typeof stepData.skills === 'string') {
        updateData.skills = stepData.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
      }

      const { error } = await supabase
        .from('user_onboarding')
        .upsert(updateData, { onConflict: 'user_id' });

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error updating onboarding data:', error);
      toast({
        title: "Error",
        description: "Failed to save your information. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    let stepData = {};

    if (currentStep === 1) {
      stepData = {
        full_name: formData.full_name,
        desired_job_role: formData.desired_job_role,
        desired_location: formData.desired_location
      };
    } else if (currentStep === 2) {
      stepData = {
        job_experience: formData.job_experience,
        expected_salary: formData.expected_salary,
        current_salary_range: formData.current_salary_range
      };
    } else if (currentStep === 3) {
      stepData = {
        skills: formData.skills,
        availability: formData.availability,
        remote_preference: formData.remote_preference,
        onboarding_completed: true
      };
    }

    const success = await updateOnboardingData(stepData, currentStep + 1);

    if (success) {
      if (currentStep === 3) {
        toast({
          title: "Welcome to ApplySmart!",
          description: "Your profile is now complete. Let's find you the perfect job!"
        });
        navigate('/dashboard');
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="desired_job_role">Desired Job Role *</Label>
              <Input
                id="desired_job_role"
                value={formData.desired_job_role}
                onChange={(e) => setFormData({...formData, desired_job_role: e.target.value})}
                placeholder="e.g., Software Engineer, Product Manager"
                required
              />
            </div>

            <div>
              <Label htmlFor="desired_location">Preferred Location *</Label>
              <Input
                id="desired_location"
                value={formData.desired_location}
                onChange={(e) => setFormData({...formData, desired_location: e.target.value})}
                placeholder="e.g., New York, Remote, San Francisco"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="job_experience">Years of Experience *</Label>
              <select
                id="job_experience"
                value={formData.job_experience}
                onChange={(e) => setFormData({...formData, job_experience: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years (Entry Level)</option>
                <option value="2-3">2-3 years</option>
                <option value="4-6">4-6 years (Mid Level)</option>
                <option value="7-10">7-10 years (Senior Level)</option>
                <option value="10+">10+ years (Expert Level)</option>
              </select>
            </div>

            <div>
              <Label htmlFor="expected_salary">Expected Salary Range *</Label>
              <Input
                id="expected_salary"
                value={formData.expected_salary}
                onChange={(e) => setFormData({...formData, expected_salary: e.target.value})}
                placeholder="e.g., $80,000 - $100,000"
                required
              />
            </div>

            <div>
              <Label htmlFor="current_salary_range">Current Salary (Optional)</Label>
              <Input
                id="current_salary_range"
                value={formData.current_salary_range}
                onChange={(e) => setFormData({...formData, current_salary_range: e.target.value})}
                placeholder="e.g., $70,000"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="skills">Skills (comma-separated) *</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                placeholder="e.g., React, Node.js, Python, Project Management"
                required
              />
            </div>

            <div>
              <Label htmlFor="availability">Availability *</Label>
              <select
                id="availability"
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select availability</option>
                <option value="immediate">Available Immediately</option>
                <option value="2-weeks">2 weeks notice</option>
                <option value="1-month">1 month notice</option>
                <option value="2-months">2+ months</option>
              </select>
            </div>

            <div>
              <Label htmlFor="remote_preference">Work Preference *</Label>
              <select
                id="remote_preference"
                value={formData.remote_preference}
                onChange={(e) => setFormData({...formData, remote_preference: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select preference</option>
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site Only</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Basic Information",
    "Experience & Salary",
    "Skills & Preferences"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step <= currentStep
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step < currentStep ? <Check className="h-4 w-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-20 h-1 mx-2 ${
                      step < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {stepTitles[currentStep - 1]}
              </h1>
              <p className="text-gray-600">Step {currentStep} of 3</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {loading ? 'Saving...' : (currentStep === 3 ? 'Complete Setup' : 'Next')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
