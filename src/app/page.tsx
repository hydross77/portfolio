import SmoothScroll from "@/components/layout/SmoothScroll"
import Loader from "@/components/ui/Loader"
import Cursor from "@/components/ui/Cursor"
import Navbar from "@/components/ui/Navbar"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Experience from "@/components/sections/Experience"
import Projects from "@/components/sections/Projects"
import Contact from "@/components/sections/Contact"

export default function Home() {
  return (
    <SmoothScroll>
      <div className="noise" aria-hidden="true" />
      <Loader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </SmoothScroll>
  )
}
