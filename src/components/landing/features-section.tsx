import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileJson, FileText, Merge, Bot, FileScan, BarChartBig } from 'lucide-react'; // Added more relevant icons
import ResumeParser from '@/components/features/resume-parser';
import DocConverter from '@/components/features/doc-converter';
import JobMatcher from '@/components/features/job-matcher';

const features = [
  {
    title: 'AI Resume Parser',
    description: 'Upload a resume (PDF/DOCX) and instantly extract structured JSON data. View, copy, or download the results.',
    icon: <FileScan className="h-10 w-10 text-primary" />, // Changed icon
    component: <ResumeParser />,
    id: 'resume-parser'
  },
  {
    title: 'Doc to Markdown',
    description: 'Convert various documents (PDF, DOCX) into clean, readable Markdown. Perfect for content repurposing.',
    icon: <FileText className="h-10 w-10 text-accent" />,
    component: <DocConverter />,
     id: 'doc-converter'
  },
  {
    title: 'Resume vs. Job Matcher',
    description: 'Compare a resume against a job description. Get an AI-powered match score and insightful summary.',
    icon: <Merge className="h-10 w-10 text-primary" />, // Changed icon
    component: <JobMatcher />,
    id: 'job-matcher'
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 scroll-mt-14">
       <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">
         Powerful AI Tools
       </h2>
       <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            id={feature.id}
            className="flex flex-col animate-fadeIn border-2 border-transparent hover:border-primary/30 transition-all duration-300 ease-out hover:shadow-2xl group bg-card" // Added hover border and shadow
            style={{ animationDelay: `${index * 0.15}s` }}
            >
             {/* Optional: Add a subtle gradient top border */}
             {/* <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-t-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div> */}
            <CardHeader className="flex flex-row items-start gap-4 p-6 pb-4"> {/* Adjusted padding */}
               <div className="p-3 bg-primary/10 rounded-lg mt-1"> {/* Icon background */}
                 {feature.icon}
               </div>
              <div>
                <CardTitle className="text-xl font-semibold text-primary group-hover:bg-gradient-text transition-all duration-300">{feature.title}</CardTitle> {/* Gradient on hover */}
                <CardDescription className="text-foreground/70 mt-1">{feature.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col p-6 pt-2"> {/* Adjusted padding */}
              {feature.component}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
