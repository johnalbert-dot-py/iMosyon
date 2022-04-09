/* eslint-disable react/no-unescaped-entities */
import React from 'react'

import EmojiCircle from '@/components/EmojiCircle'

export const LeftContent = ({ emoji, heading, message }) => {
  return (
    <div className="left-content">
      <div className="circles">
        <EmojiCircle
          emoji={emoji[0]}
          background="linear-gradient(136.81deg, #E18B0A 15.77%, #0ABBE1 108.38%)"
        />
        <EmojiCircle
          emoji={emoji[1]}
          background="linear-gradient(54.94deg, #690AE1 13.19%, #FF0EBB 134.86%)"
        />
        <EmojiCircle
          emoji={emoji[2]}
          background="linear-gradient(70.11deg, #0AE17A 16.53%, #1200DF 109.66%)"
        />
      </div>
      <div className="content">
        <h1>{heading}</h1>
        <div className="left-description">
          <span className="message">“{message}”</span>
          <span className="team">-iMosyon Team</span>
        </div>
      </div>
    </div>
  )
}

export default LeftContent
