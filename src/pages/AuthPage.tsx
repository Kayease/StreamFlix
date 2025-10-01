import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  
  // Set active tab based on URL parameter and reset form when tab changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'login' || tab === 'signup') {
      setActiveTab(tab);
      // Reset form when tab changes
      setFormData({
        email: "",
        password: "",
        name: "",
        confirmPassword: ""
      });
      setErrors({
        email: "",
        password: "",
        confirmPassword: "",
        name: ""
      });
    }
  }, [searchParams]);
  
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Single form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  
  // Define types for form state
  type FormErrors = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  };

  type TouchedFields = {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    name: boolean;
  };

  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    password: false,
    confirmPassword: false,
    name: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Debug effect for submitSuccess state
  useEffect(() => {
    console.log('submitSuccess changed to:', submitSuccess);
  }, [submitSuccess]);
  
  // Forgot password state
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter code, 3: Reset password

  // Validation functions
  const validateEmail = (email: string): boolean => {
    // Strict email validation regex with exactly 4 characters after the dot
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/;
    return regex.test(email);
  };

  const validateName = (name: string): { isValid: boolean; error: string } => {
    // Only letters, spaces, hyphens, and apostrophes allowed, no leading/trailing spaces
    const nameRegex = /^[A-Za-z]+(?:[ -'][A-Za-z]+)*$/;
    if (!name.trim()) {
      return { isValid: false, error: 'Name is required' };
    }
    if (/^\s|\s$/.test(name)) {
      return { isValid: false, error: 'Name cannot have leading or trailing spaces' };
    }
    if (!nameRegex.test(name)) {
      return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }
    if (name.length > 40) {
      return { isValid: false, error: 'Name cannot exceed 50 characters' };
    }
    return { isValid: true, error: '' };
  };

  const validatePassword = (password: string): { isValid: boolean; error: string } => {
    if (!password) {
      return { isValid: false, error: 'Password is required' };
    }
    
    // Check length first - must be exactly 8-12 characters
    if (password.length < 8 || password.length > 12) {
      return { 
        isValid: false, 
        error: 'Password must be between 8 and 12 characters long' 
      };
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one uppercase letter' };
    }
    
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one lowercase letter' };
    }
    
    // Check for at least one number
    if (!/\d/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one number' };
    }
    
    // Check for at least one special character
    if (!/[@$!%*?&]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one special character (@$!%*?&)' };
    }
    
    return { isValid: true, error: '' };
  };

  const validateForm = useCallback(() => {
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    };
    let hasError = false;

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    } else {
      newErrors.email = '';
    }

    // Password validation for login
    if (activeTab === 'login') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
        hasError = true;
      } else {
        newErrors.password = '';
      }
    }

    // Signup validations
    if (activeTab === 'signup') {
      // Name validation
      const trimmedName = formData.name.trim();
      if (!trimmedName) {
        newErrors.name = 'Name is required';
        hasError = true;
      } else {
        const nameValidation = validateName(formData.name);
        if (!nameValidation.isValid) {
          newErrors.name = nameValidation.error;
          hasError = true;
        } else {
          newErrors.name = '';
        }
      }
      
      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required';
        hasError = true;
      } else if (formData.password.includes(' ')) {
        newErrors.password = 'Password cannot contain spaces';
        hasError = true;
      } else {
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
          newErrors.password = passwordValidation.error;
          hasError = true;
        } else {
          newErrors.password = '';
        }
      }
      
      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
        hasError = true;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        hasError = true;
      } else {
        newErrors.confirmPassword = '';
      }
    }

    setErrors(newErrors);
    return !hasError;
  }, [activeTab, formData, errors]);
    
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Prevent leading/trailing spaces in name field
    if (name === 'name') {
      if (value.startsWith(' ') || value.endsWith(' ')) {
        return; // Don't update if trying to add leading/trailing spaces
      }
    }
    
    // Prevent spaces in password fields
    if ((name === 'password' || name === 'confirmPassword') && value.includes(' ')) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);
    
    // Mark all fields as touched to show errors
    setTouched({
      email: true,
      password: true,
      confirmPassword: activeTab === 'signup',
      name: activeTab === 'signup'
    });
    
    // Clear previous errors
    setErrors({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    
    // Validate password length first
    if (formData.password.length < 8 || formData.password.length > 12) {
      setErrors(prev => ({
        ...prev,
        password: 'Password must be between 8 and 12 characters long'
      }));
      return;
    }
    
    // Check password match for signup
    if (activeTab === 'signup' && formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: "Passwords don't match!"
      }));
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log form submission
      console.log('Form submitted successfully', { activeTab, formData });
      
      // Handle successful submission
      if (activeTab === 'signup') {
        console.log('Signup success - showing success message');
        setSubmitSuccess(true);
        
        // Keep the success state for 3 seconds
        const successTimer = setTimeout(() => {
          setSubmitSuccess(false);
          
          // Reset form after showing success
          setFormData({
            email: "",
            password: "",
            name: "",
            confirmPassword: ""
          });
          
          // Reset touched state
          setTouched({
            email: false,
            password: false,
            confirmPassword: false,
            name: false
          });
          
          // Switch to login tab
          setActiveTab('login');
          
          // Redirect to home page after 1 second on the login tab
          setTimeout(() => {
            navigate('/');
          }, 1000);
          
        }, 3000);
        
        return () => clearTimeout(successTimer);
      } else {
        // For login, just reset the form
        setTimeout(() => {
          setSubmitSuccess(false);
          
          // Reset form after successful submission
          setFormData({
            email: formData.email,
            password: "",
            name: "",
            confirmPassword: ""
          });
          
          // Reset touched state
          setTouched({
            email: true,
            password: false,
            confirmPassword: false,
            name: false
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate and send verification code
  const generateAndSendCode = useCallback(() => {
    // Generate a random 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(code);
    
    // In a real app, you would send this code to the user's email
    console.log('Verification code:', code);
    
    // For demo purposes, we'll show an alert with the code
    alert(`Your verification code is: ${code} (This is just for demo - in a real app, this would be sent via email)`);
    
    // Reset verification code input
    setVerificationCode('');
  }, []);
  
  // Handle forgot password form submission
  const handleForgotPasswordSubmit = () => {
    if (step === 1) {
      // Validate email
      if (!forgotPasswordEmail || !validateEmail(forgotPasswordEmail)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Generate and send code
      generateAndSendCode();
      setStep(2);
      
    } else if (step === 2) {
      // Validate verification code
      if (verificationCode !== generatedCode) {
        alert('Invalid verification code. Please try again.');
        return;
      }
      
      setStep(3);
      
    } else if (step === 3) {
      // In a real app, you would update the password here
      alert('Password has been reset successfully!');
      setForgotPasswordOpen(false);
      
      // Reset the form
      setStep(1);
      setForgotPasswordEmail('');
      setVerificationCode('');
    }
  };
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <div className="relative">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-10">
        <a 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-white hover:text-blue-400 transition-colors"
        >
          <svg 
            className="h-5 w-5 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Home
        </a>
      </div>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-6 sm:px-6 lg:px-8">
        <div className="max-w-md w-full  py-8 space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Welcome to Streamflix
            </h2>
          <p className="mt-2 text-sm text-gray-600">
            {activeTab === "login" 
             }
          </p>
        </div>

        <Card className="w-full max-w-md">
          <Tabs 
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full flex flex-col"
            defaultValue="login"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="flex-1 min-h-[500px]">
              <CardContent className="h-full">
                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                  {submitSuccess && (
                    <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                      {activeTab === 'login' 
                        ? 'Successfully signed in! Redirecting...' 
                        : 'Account created successfully! You can now sign in.'}
                    </div>
                  )}
                  <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showLoginPassword ? "text" : "password"}
                          autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
                          required
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`mt-1 ${errors.password && touched.password ? 'border-red-500' : ''}`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 h-full"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                        >
                          {showLoginPassword ? (
                            <Eye className="h-5 w-5" />
                          ) : (
                            <EyeOff className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.password && touched.password && (
                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <button 
                        type="button" 
                        onClick={() => setForgotPasswordOpen(true)}
                        className="ml-2 block text-sm text-blue-400 hover:text-blue-300"
                      >
                        Forgot your password?
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      className={`w-full ${
                        isSubmitting 
                          ? 'bg-blue-400' 
                          : submitSuccess 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-red-600 hover:bg-red-700'
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
                        </>
                      ) : submitSuccess ? (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {activeTab === 'login' ? 'Signed in!' : 'Account created!'}
                        </>
                      ) : (
                        activeTab === 'login' ? 'Sign in' : 'Create account'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup" className="flex-1 min-h-[500px]">
              <CardContent className="h-full">
                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                  {submitSuccess && activeTab === 'signup' && (
                    <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg flex items-center">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Account created successfully! Redirecting to login...</span>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email address</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          name="password"
                          type={showSignupPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="mt-1 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 h-full"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                        >
                          {showSignupPassword ? (
                            <Eye className="h-5 w-5" />
                          ) : (
                            <EyeOff className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`mt-1 pr-10 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 h-full"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <Eye className="h-5 w-5" />
                          ) : (
                            <EyeOff className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                        Remember me
                      </label>
                    </div>
                      

                  {/* <div className="flex items-center">
                    
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                      I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms</a> and <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                    </label>
                  </div> */}

                  <div>
                    <Button 
                      type="submit" 
                      className={`w-full ${
                        isSubmitting 
                          ? 'bg-blue-400' 
                          : submitSuccess 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-red-600 hover:bg-red-700'
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating account...
                        </>
                      ) : submitSuccess ? (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Account Created!
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center text-sm">
          {activeTab === "login" ? (
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => setActiveTab("signup")} 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => setActiveTab("login")} 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
      
      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {step === 1 ? 'Reset Password' : step === 2 ? 'Verify Code' : 'Create New Password'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {step === 1 
                ? 'Enter your email address to receive a verification code.'
                : step === 2
                ? `We've sent a 4-digit code to ${forgotPasswordEmail}`
                : 'Create a new password for your account.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {step === 1 && (
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-2">
                <Label>Verification Code</Label>
                <div className="flex justify-center space-x-2">
                  {[0, 1, 2, 3].map((index) => (
                    <Input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={verificationCode[index] || ''}
                      onChange={(e) => {
                        const newCode = verificationCode.split('');
                        newCode[index] = e.target.value;
                        setVerificationCode(newCode.join(''));
                        
                        // Auto-focus next input
                        if (e.target.value && index < 3) {
                          document.getElementById(`code-${index + 1}`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        // Handle backspace to move to previous input
                        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
                          document.getElementById(`code-${index - 1}`)?.focus();
                        }
                      }}
                      id={`code-${index}`}
                      className="w-12 h-12 text-center text-xl font-bold bg-gray-800 border-gray-700 text-white"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Didn't receive a code? <button 
                    className="text-blue-400 hover:underline"
                    onClick={generateAndSendCode}
                  >
                    Resend
                  </button>
                </p>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="text-white border-gray-700 hover:bg-gray-800"
              >
                Back
              </Button>
            )}
            <Button 
              type="button" 
              onClick={handleForgotPasswordSubmit}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {step === 1 ? 'Send Code' : step === 2 ? 'Verify Code' : 'Reset Password'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}
