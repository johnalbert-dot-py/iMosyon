import { React } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOctagonExclamation } from '@fortawesome/pro-light-svg-icons'

import { motion } from 'framer-motion'

export const Error = ({ onClose, children }) => (
  <motion.div
    initial={{ x: 200 }}
    animate={{
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 9,
        mass: 1,
      },
    }}
    className="flex h-[70vh] justify-center items-center"
  >
    <div className=" px-10 py-20 bg-secondary-dark w-[640px] flex flex-col justify-center items-center gap-6">
      <motion.div
        initial={{
          scale: 0,
          x: 800,
        }}
        animate={{
          scale: 1,
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 9,
            duration: 0.5,
          },
        }}
        className="text-red-400"
      >
        <FontAwesomeIcon
          icon={faOctagonExclamation}
          className="text-9xl text-danger"
        />
      </motion.div>
      <div className="text-center w-1/2 font-primary font-semibold text-xl text-primary-white">
        An Error Occurred
      </div>
      <div className="bg-secondary-dark text-primary-white">{children}</div>
      <div className="mt-auto">
        <button
          className="font-primary uppercase text-primary-white bg-danger py-2 px-5 rounded-md hover:bg-opacity-50"
          onClick={onClose}
        >
          close
        </button>
      </div>
    </div>
  </motion.div>
)

export default Error
