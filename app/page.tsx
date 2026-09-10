
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp } from "lucide-react"
import Link from "next/link";
import HeroImage from "@/components/heroImage";




export default function Home() {


  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-black mb-6 text-6xl font-bold">
            A better way to track your job applications
            </h1>
            <p className="text-muted-foreground mb-10 text-xl">
              Capture, organize and manage your job search in one  one place. 
            </p>

            <div className="flex flex-col items-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="h-12 px-8 text-lg font-medium" >
                  Start for free
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">Free forever. No payment is required.</p>
            </div>
          </div>
        </section>

        {/* Hero Images Section Tabs*/}
        <HeroImage />

        {/* Features Section */}
        <section className="border-t bg-white py-24">
          <div className="container mx-auto px-20">
            <div className="grid gap-12 md:grid-cols-3 ">
              <div className="flex flex-col items-center justify-start text-center">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Organize Applications
                </h3>
                <p className="text-muted-foreground">
                Save each job application with important details like company name, role, location, deadline, salary, and application link.
                 You can move applications between stages so your whole job search stays clear and easy to manage
                </p>
              </div>
              <div className="flex flex-col items-center justify-start text-center">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Track Progress
                </h3>
                <p className="text-muted-foreground">
                Follow every opportunity from applied to interview, assessment, offer, or closed. Visual progress tracking helps you understand where each application stands and when you need to follow up.
                </p>
              </div>
              <div className="flex flex-col items-center justify-start text-center">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                Keep Everything Together
                </h3>
                <p className="text-muted-foreground">
                  Never lose track of an application.Keep notes, contacts, links, deadlines, and updates in one organized place. Everything stays connected to the right application, so you can prepare faster and avoid losing important information
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>



  );
}
