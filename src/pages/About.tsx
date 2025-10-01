import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

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
          <h1 className="text-4xl font-bold text-primary text-glow mb-8">About StreamFlix</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                StreamFlix was founded with a simple mission: to bring the world's best entertainment 
                directly to your screen. We believe that great stories have the power to connect, 
                inspire, and transform lives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Since our launch, we've been committed to providing high-quality streaming content 
                that spans genres, cultures, and languages, ensuring there's something for everyone.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">What We Offer</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Unlimited streaming on all your devices
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Original content and exclusive premieres
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  HD and 4K streaming quality
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Download for offline viewing
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Content for all ages and interests
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-card rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              We envision a world where premium entertainment is accessible to everyone, everywhere. 
              Our platform continues to evolve, embracing new technologies and storytelling formats 
              to deliver the ultimate viewing experience for our global community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;