import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import BackgroundFX from './components/BackgroundFX'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Highlights from './components/Highlights'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <BackgroundFX />

      <div className="relative min-h-screen overflow-x-clip">
        <Navbar />
        <main>
          <Hero ready={ready} />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Certifications />
          <Highlights />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
