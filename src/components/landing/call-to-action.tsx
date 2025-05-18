import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles } from 'lucide-react'; // Added icon

export default function CallToAction() {
  return (
    <section id="try-now" className="py-20 md:py-32 text-center bg-gradient-to-br from-primary/80 to-accent/80 rounded-lg shadow-xl scroll-mt-14 animate-fadeIn my-16 md:my-24"> {/* Gradient background */}
      <div className="container mx-auto px-4">
        <Sparkles className="h-12 w-12 text-white mx-auto mb-4 animate-pulse-glow" /> {/* Added icon */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Ready to Accelerate Your Workflow?</h2> {/* White text for contrast */}
        <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
          Start parsing resumes, converting documents, and matching candidates in seconds. Experience the power of AI today!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
           {/* Button with a different gradient or style */}
           <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg px-8 py-3 text-base font-semibold">
             <Link href="#resume-parser">Get Started Now</Link>
           </Button>
           <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-all duration-300 ease-out hover:scale-105 px-8 py-3 text-base">
             <Link href="#features">Explore Features</Link>
           </Button>
        </div>
      </div>
    </section>
  );
}
