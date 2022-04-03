import wavyImg from '@/assets/wavy-lines.svg';
import wavyImgLarge from '@/assets/wavy-lines-lg.svg';
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

export default WavyLines;