import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Music, Users, Zap, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import Navbar from "./components/Navbar"
import Redirect from "./components/Redirect"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Redirect />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 max-w-[1200px] mx-auto">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Let Your Fans Choose the Beat
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  NextSound: The revolutionary music streaming platform where creators and fans collaborate on the perfect playlist.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Fan Interaction</h3>
                <p className="text-gray-500 dark:text-gray-400">Engage your audience by letting them choose the music.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Real-time Streaming</h3>
                <p className="text-gray-500 dark:text-gray-400">Seamless, high-quality audio streaming for creators and listeners.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Star className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Personalized Experience</h3>
                <p className="text-gray-500 dark:text-gray-400">Tailored music suggestions based on fan preferences.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="creators" className="w-full py-12 md:py-24 lg:py-32 max-w-[1200px] mx-auto">
          <div className=" px-4 md:px-6">
            <div className="flex items-center justify-center">
              <div className="flex flex-col justify-center items-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">For Creators</h2>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take your music to the next level. Connect with your fans like never before and let them be part of your creative journey.
                </p>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Grow your audience with interactive streams
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Get real-time feedback on your music
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Monetize your streams with built-in tipping
                  </li>
                </ul>
                <Button>Start Creating</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="fans" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className=" px-4 md:px-6">
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col justify-center items-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">For Fans</h2>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Be more than just a listener. Shape the music you love and connect with your favorite creators in real-time.
                </p>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Vote on the next song in the queue
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Discover new music through creator streams
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Interact with other fans in real-time chat
                  </li>
                </ul>
                <Button>Join the Community</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 max-w-[1200px] mx-auto">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Revolutionize Music Streaming?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join NextSound today and be part of the future of interactive music experiences.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t max-w-[1200px] mx-auto">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 NextSound. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}