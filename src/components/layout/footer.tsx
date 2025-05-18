import Link from 'next/link';
import { Bot, Github, Linkedin } from 'lucide-react'; // Example icons

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-border/40 py-8 mt-20 md:mt-32 bg-muted/30 scroll-mt-14"> {/* Added ID and background */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="inline-flex items-center space-x-2 mb-2 group">
              <Bot className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
              <span className="font-bold text-lg text-primary group-hover:bg-gradient-text transition-all duration-300">AIAccelerate</span>
            </Link>
            <p className="text-sm text-foreground/60">
              AI-powered tools for modern workflows.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="font-semibold mb-3 text-foreground/80">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="text-foreground/60 hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#try-now" className="text-foreground/60 hover:text-foreground transition-colors">Try Now</Link></li>
              {/* Add placeholder links */}
              <li><Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-foreground/60 hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Social/Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-foreground/80">Connect</h4>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <Link href="#" aria-label="GitHub" className="text-foreground/60 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              {/* Add more social links */}
            </div>
            <p className="text-sm text-foreground/60">support@aiaccelerate.example</p> {/* Placeholder Email */}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/40 pt-6 mt-8 text-center text-xs text-foreground/50">
          © {new Date().getFullYear()} AIAccelerate. All rights reserved.
          {/* Optional: Add privacy/terms links */}
          {/* <span className="mx-2">|</span>
          <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
          <span className="mx-2">|</span>
          <Link href="#" className="hover:text-foreground">Terms of Service</Link> */}
        </div>
      </div>
    </footer>
  );
}
