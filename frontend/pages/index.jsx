import { Button } from "@/components/ui/button";
import { SignedIn, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import {
  BriefcaseBusiness,
  FileText,
  MessageSquare,
  Sparkles,
  UserCheck,
  ClipboardList,
  Brain,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


const navLinks = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/resume", label: "Resume Tools" },
  { href: "/interviews", label: "Interview Prep" },
  { href: "/career-guidance", label: "Career Guidance" },
];

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">JobGenie</span>
          </Link>
          <nav className="hidden gap-4 md:flex">
            <SignedIn>
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={link.href}>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                      {link.label}
                    </button>
                  </Link>
                </motion.div>
              ))}
            </SignedIn>
          </nav>
          <div className="flex items-center gap-4">
            {isSignedIn ? (
<></>            ) : (
              <div className="flex gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-lg border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium px-5 py-2.5 transition-all shadow-sm hover:shadow-xs"
                >
                  <SignInButton mode="redirect" />
                </Button>
                <Button
                  asChild
                  className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium px-5 py-2.5 transition-all shadow-md hover:shadow-sm"
                >
                  <SignUpButton mode="redirect" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    Find Your <span className="text-blue-600">Dream Job</span> with AI
                  </h1>
                  <p className="mt-4 text-lg text-gray-600 max-w-[600px]">
                    JobGenie uses advanced AI to match you with perfect opportunities, optimize your resume, and prepare you for interviews.
                  </p>
                </motion.div>
                <div className="flex flex-wrap gap-4">
                  <Button className="rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium px-5 py-2.5 transition-all shadow-md hover:shadow-sm">
                    <SignInButton forceRedirectUrl="/jobs">
                      Get Started
                    </SignInButton>
                  </Button>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative w-full overflow-hidden rounded-2xl shadow-xl"
              >
                <Image
                  src="/hero.jpg"
                  width={600}
                  height={600}
                  alt="JobGenie Dashboard Preview"
                  className="object-cover w-full h-full"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">AI-Powered Features</h2>
              <p className="mt-4 text-lg text-gray-600">
                Our advanced tools help you navigate every step of your job search journey
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Feature icon={BriefcaseBusiness} title="AI Job Matching" desc="Get personalized job recommendations with compatibility scores based on your skills." />
              <Feature icon={FileText} title="Resume Optimization" desc="AI analyzes and optimizes your resume for specific roles to increase visibility." />
              <Feature icon={MessageSquare} title="Interview Preparation" desc="Practice with AI-powered mock interviews and receive real-time feedback." />
              <Feature icon={UserCheck} title="Profile Assessment" desc="Get instant feedback on your professional profile and areas for improvement." />
              <Feature icon={ClipboardList} title="Skill Gap Analysis" desc="Discover what skills you need to develop for your target roles." />
              <Feature icon={Brain} title="AI Career Planner" desc="Personalized career paths and strategies tailored to your goals." />
            </div>
          </div>
        </section>

        <section className="w-full py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Success Stories</h2>
              <p className="mt-4 text-lg text-gray-600">
                Hear from professionals who accelerated their careers with JobGenie
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <TestimonialCard
                name="Aditya Menon"
                feedback="JobGenie landed me my dream role in just 2 weeks! The AI suggestions were spot on."
                title="Product Designer"
              />
              <TestimonialCard
                name="Kaushal Loya"
                feedback="I optimized my resume using JobGenie and started getting 3x more callbacks."
                title="Data Analyst"
              />
              <TestimonialCard
                name="Rahul K."
                feedback="The interview prep feature was so realistic. I felt confident and prepared."
                title="Software Developer"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto flex flex-col gap-6 py-12 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">JobGenie</span>
            </Link>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} JobGenie. All rights reserved.
            </p>
          </div>
          <nav className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/privacy" className="text-sm font-medium text-gray-600 hover:text-gray-900">Privacy</Link>
            <Link href="/terms" className="text-sm font-medium text-gray-600 hover:text-gray-900">Terms</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </motion.div>
  );
}

function TestimonialCard({ name, feedback, title }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <p className="text-gray-600">"{feedback}"</p>
      <div className="mt-6">
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{title}</p>
      </div>
    </motion.div>
  );
}