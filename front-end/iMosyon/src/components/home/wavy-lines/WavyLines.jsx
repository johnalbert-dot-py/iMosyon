import wavyImg from '@/assets/wavy-lines.svg';
import wavyImgLarge from '@/assets/wavy-lines-lg.svg';
import wavyImgLR from '@/assets/wavy-lines-l-and-r.svg';
import { motion } from 'framer-motion'

import './wavyline.scss'


export const WavyLines = ({ children, ...props }) => {

  return (
    <div className="wavy">
      <img src={wavyImg} />
    </div>
  )
}

export const WavyLinesLarge = ({ children, ...props }) => {

  return (
    <motion.div className='wavy-large' animate={{
      x: 0,
      opacity: 1,
      transition: {
        duration: .8,
      }
    }} initial={{
      x: -25,
      opacity: 0
    }}>
      <img src={wavyImgLarge} />
    </motion.div>
  )
}

export const WavyLinesLeftAndRight = ({ children, ...props }) => {
  return (
    <motion.div className="wavy-left-and-right" animate={{
      x: 0,
      opacity: 1,
      transition: {
        duration: .8,
      }
    }} initial={{
      x: 25,
      opacity: 0
    }}>
      <img src={wavyImgLR}/>
    </motion.div>
  )
}

export default WavyLines;