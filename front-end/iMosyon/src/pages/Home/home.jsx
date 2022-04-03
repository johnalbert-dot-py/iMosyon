import './home.scss';

import { BtnLight, BtnLightCircleOutline } from '@/components/buttons/button.jsx'
import SystemStep from '@/components/home/system-step.jsx'
import Navbar from "@/components/navbar/navbar"
import { useState, useEffect } from "react"

export default function Home() {
  useEffect(() => {
    document.body.classList.add("home")
  })
  return (
    <div>
      <header>
        <Navbar>
        </Navbar>
        <main>
          <div className="header-content">
            <div className="contents">
              <span>
                iMosyon
              </span>
              <h1>
                Let's predict emotion
                through sentences.
              </h1>
            </div>
            <div className="action">
              <p>
                Start sign-up to fully experience our Emotion Prediction system.
              </p>
              <BtnLight btnSize="btn-lg" btnWidth="btn-lg-w">
                Get Started
              </BtnLight>
            </div>
          </div>
        </main>
      </header>

      <section id="system-description">
        <h1>
          How our system works?
        </h1>
        <SystemStep />
      </section>
    </div >
  )
}