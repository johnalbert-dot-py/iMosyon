import { React } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/pro-light-svg-icons'

import { motion } from 'framer-motion'

export const Loading = (props) => (
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
    <div className=" px-10 py-20 bg-secondary-dark w-[640px] text-primary-white flex flex-col justify-center items-center gap-6">
      <div className="">
        <FontAwesomeIcon icon={faCircleNotch} className="text-9xl fa-spin" />
      </div>
      <div className="text-center w-1/2 font-primary font-semibold text-xl">
        Please wait while we’re processing the result
      </div>
      {props.children}
    </div>
  </motion.div>
)

export default Loading
