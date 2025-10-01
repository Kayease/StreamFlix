import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Help = () => {
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your Account Settings. Go to Subscription and click 'Cancel Subscription'."
    },
    {
      question: "Can I download content for offline viewing?",
      answer: "Yes! Look for the download icon on eligible titles. Downloaded content is available for 30 days."
    },
    {
      question: "How many devices can I stream on?",
      answer: "You can stream on up to 4 devices simultaneously with our premium plan, 2 with standard."
    },
    {
      question: "What video quality do you offer?",
      answer: "We offer HD (1080p) and Ultra HD (4K) streaming, depending on your plan and device capabilities."
    },
    {
      question: "How do I change my password?",
      answer: "Go to Account Settings > Security > Change Password. You'll need to verify your current password first."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8 text-foreground hover:text-primary"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary text-glow mb-8">Help Center</h1>
          
          <div className="relative mb-12">
            
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card p-6 rounded-lg text-center hover:bg-accent smooth-transition cursor-pointer">
              <h3 className="text-xl font-semibold text-foreground mb-2">Account & Billing</h3>
              <p className="text-muted-foreground">Manage your account, subscription, and payment methods</p>
            </div>
            <div className="bg-card p-6 rounded-lg text-center hover:bg-accent smooth-transition cursor-pointer">
              <h3 className="text-xl font-semibold text-foreground mb-2">Streaming Issues</h3>
              <p className="text-muted-foreground">Troubleshoot playback, buffering, and quality problems</p>
            </div>
            <div className="bg-card p-6 rounded-lg text-center hover:bg-accent smooth-transition cursor-pointer">
              <h3 className="text-xl font-semibold text-foreground mb-2">Device Support</h3>
              <p className="text-muted-foreground">Setup and troubleshooting for all your devices</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-card rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help 24/7.
            </p>
            <Button 
              className="btn-hero"
              onClick={() => navigate('/')}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;