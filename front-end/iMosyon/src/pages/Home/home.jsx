import { React, useEffect } from 'react'
import { motion } from 'framer-motion'

import { BtnLight } from '@/components/buttons/button.jsx'
import SystemStep from '@/components/home/system-step.jsx'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/home/footer.jsx'

import {
  WavyLines,
  WavyLinesLarge,
  WavyLinesLeftAndRight,
} from '@/components/home/wavy-lines/WavyLines.jsx'

import './home.scss'

export default function Home() {
  useEffect(() => {
    document.title = 'iMosyon | Home'
    document.getElementsByTagName('body')[0].classList.add('home')
  })
  return (
    <>
      <Navbar></Navbar>
      <header>
        <main>
          <div className="header-content">
            <WavyLines />
            <WavyLinesLarge />
            <WavyLinesLeftAndRight />
            <motion.div
              className="contents"
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                },
              }}
              initial={{
                y: 50,
                opacity: 0,
              }}
            >
              <span>iMosyon</span>
              <h1>Let’s predict emotion through sentences.</h1>
            </motion.div>
            <motion.div
              className="action"
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                },
              }}
              initial={{
                y: 50,
                opacity: 0,
              }}
            >
              <p>
                Start sign-up to fully experience our Emotion Prediction system.
              </p>
              <BtnLight size="btnd-md" width="btnd-lg-w" show_on_small="true">
                Get Started
              </BtnLight>
            </motion.div>
          </div>
        </main>
      </header>
      <section id="system-description">
        <h1>How our system works?</h1>
        <SystemStep />
      </section>
      <Footer />
    </>
  )
}
