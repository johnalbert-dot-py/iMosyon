import { React } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/pro-solid-svg-icons'

const PredictedEmotionResult = ({ predicted_emotion }) => {
  let color = '#E3EDF6'
  let bgColor = ''
  switch (predicted_emotion.toUpperCase()) {
    case 'JOY':
      color = '#191A1B'
      bgColor = '#FFD873'
      break

    case 'SADNESS':
      bgColor = '#8499AE'
      break

    case 'ANGER':
      bgColor = '#FA7E7E'
      break

    case 'ANTICIPATION':
      bgColor = '#739AFF'
      break

    case 'TRUST':
      bgColor = '#58965A'
      break

    case 'SURPRISE':
      bgColor = '#CA73FF'
      break

    case 'DISGUST':
      bgColor = '#E96363'
      break
  }

  let EmotionResult = styled.span`
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.color};
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 7px;
    padding-bottom: 7px;
    border-radius: 40px;
    font-size: 80%;
    max-width: 20px;
  `

  return (
    <td className="font-primary font-bold uppercase text-[15px] pl-8 text-left pr-7">
      <EmotionResult bgColor={bgColor} color={color}>
        {predicted_emotion}
      </EmotionResult>
    </td>
  )
}

const PredictedEmotionAccuracy = ({ accuracy }) => {
  let color = ''
  if (accuracy <= 30.0) {
    color = '#FA7E7E'
  } else if (accuracy <= 65.0) {
    color = '#B5B760'
  } else {
    color = '#60B763'
  }

  let EmotionAccuracy = styled.span`
    color: ${(props) => props.color};
  `

  return (
    <td className="font-primary font-bold pl-0 pr-8 py-5 text-[15px]">
      <EmotionAccuracy color={color}>{accuracy} %</EmotionAccuracy>
    </td>
  )
}

export const ItemResult = ({
  phrase,
  predicted_emotion,
  deleteWord,
  props,
}) => {
  return (
    <tr
      {...props}
      className="border-b border-[#54595E] hover:cursor-default group transition-all hover:bg-primary-dark"
    >
      <td className="text-primary-white font-primary font-bold pl-8 py-7 text-[15px] truncate pr-7 lg:max-w-[50px] md:max-w-[50px] sm:max-w-[20px]">
        {phrase}
      </td>
      <PredictedEmotionResult predicted_emotion={predicted_emotion} />
      <PredictedEmotionAccuracy accuracy={50.05} />
      <td className="text-primary-white font-primary ">
        <a
          href="#"
          onClick={deleteWord}
          className="group-hover:text-danger group-hover:block hidden"
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="group-hover:text-danger hover:text-opacity-45 text-primary-white"
          />
        </a>
      </td>
    </tr>
  )
}

export default ItemResult
