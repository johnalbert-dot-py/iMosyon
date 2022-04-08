import './system-step.scss';
import step1 from "@/assets/undraw-step-1.svg"
import step2 from "@/assets/undraw-step-2.svg"
import step3 from "@/assets/undraw-step-3.svg"
import { motion } from 'framer-motion';

export const SystemStep = () => {
  return (
    <div className="system-step">
      <div className="step">
        <div className="step-img">
          <img src={step1} alt="step1" />
        </div>
        <div className="step-content">
          User will upload an csv file
          that contains a columns of
          sentences or just words.
        </div>
      </div>

      <div className="step">
        <div className="step-img">
          <img src={step2} alt="step1" />
        </div>
        <div className="step-content">
          Our system will process the
          word using our trained model
          and return the result back to
          user.
        </div>
      </div>

      <div className="step">
        <div className="step-img">
          <img src={step3} alt="step1" />
        </div>
        <div className="step-content">
          The output will return back
          to user and save all the
          result to our database.
        </div>
      </div>
    </div>
  )
}

export default SystemStep;