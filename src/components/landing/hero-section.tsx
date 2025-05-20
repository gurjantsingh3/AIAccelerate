import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { ArrowRight } from 'lucide-react'; // Import an icon
import React from 'react'; // Import React

export default function HeroSection() {
  return (
    <section className="text-center py-20 md:py-32 animate-fadeIn">
       <div className="max-w-4xl mx-auto"> {/* Constrain width */}
         <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-text"> {/* Use gradient text utility */}
           Unlock AI Power for Your Workflow
         </h1>
         <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10">
           Streamline resume parsing, document conversion, and job matching with our intelligent tool suite. Boost your productivity effortlessly.
         </p>
         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <Button asChild size="lg" className="bg-accent-gradient hover:bg-accent-gradient-hover text-accent-foreground transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg px-8 py-3 text-base">
             <Link href="#try-now">
               {/* Simplified child to just text to resolve SlotClone error */}
               Try It Now <ArrowRight className="inline ml-2 h-5 w-5" /> {/* Keep icon, but ensure it's treated as part of the text flow */}
             </Link>
           </Button>
           <Button asChild size="lg" variant="outline" className="transition-all duration-300 ease-out hover:scale-105 hover:bg-accent/10 px-8 py-3 text-base">
             <Link href="#features">Learn More</Link>
           </Button>
         </div>
       </div>
       {/* Placeholder Illustration */}
       <div className="relative mt-12 md:mt-16 h-64 md:h-96 w-full max-w-4xl mx-auto opacity-80 group">
          <Image
           src="https://www.consultancy-me.com/illustrations/news/detail/2023-09-26-122248597-Middle_East_s_Gen_AI_economy_could_reach__24_billion_per_year_by_2030.jpg" // Placeholder image URL
           alt="AI tools illustration"
           layout="fill" // Use fill layout
           objectFit="cover" // Cover the container
           className="rounded-xl shadow-xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-90"
           data-ai-hint="abstract technology ai" // Hint for finding a real image
         />
         {/* Optional Overlay */}
         {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-xl"></div> */}
       </div>
    </section>
  );
}
