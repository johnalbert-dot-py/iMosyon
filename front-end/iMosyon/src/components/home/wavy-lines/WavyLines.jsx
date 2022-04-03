import wavyImg from '@/assets/wavy-lines.svg';
import wavyImgLarge from '@/assets/wavy-lines-lg.svg';
import wavyImgLR from '@/assets/wavy-lines-l-and-r.svg';
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
    <div className="wavy-large">
      <img src={wavyImgLarge} />
    </div>
  )
}

export const WavyLinesLeftAndRight = ({ children, ...props }) => {
  return (
    <div className="wavy-left-and-right">
      <img src={wavyImgLR}/>
    </div>
  )
}

export default WavyLines;