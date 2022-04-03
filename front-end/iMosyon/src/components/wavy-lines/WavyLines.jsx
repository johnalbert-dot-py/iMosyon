import wavyImg from '@/assets/wavy-lines.svg'
import './wavyline.scss'


const WavyLines = ({ children, ...props }) => {
  return (
    <div className="wavy">
      <img src={wavyImg} />
    </div>
  )
}

export default WavyLines;