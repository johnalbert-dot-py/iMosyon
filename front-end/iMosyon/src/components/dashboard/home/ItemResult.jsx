import { React } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/pro-solid-svg-icons'

const PredictedEmotionResult = ({ predicted_emotion, accuracy }) => {
  let color = '#E3EDF6'
  let bgColor = ''
  console.log('EMOTION IS', predicted_emotion.toUpperCase())
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

    case 'ANNOYED':
      bgColor = '#739AFF'
      break

    case 'DISGUST':
      bgColor = '#E96363'
      break

    case 'FEAR':
      bgColor = '#58965A'
      break

    case 'OUTRAGED':
      bgColor = '#CA73FF'
      break

    case 'STRONG':
      color = '#1f1f1f'
      bgColor = '#B5B760'
      break

    case 'UPSET':
      color = '#1f1f1f'
      bgColor = '#60B763'
      break

    case 'OTHERS':
      color = '#1f1f1f'
      bgColor = '#E3EDF6'
  }

  let EmotionResult = styled.span`
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.color};
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 7px;
    padding-bottom: 7px;
    border-radius: 40px;
    font-size: 80%;
    max-width: 20px;
    margin-right: 5px;
  `

  return (
    <EmotionResult bgColor={bgColor} color={color}>
      {predicted_emotion} - <PredictedEmotionAccuracy accuracy={accuracy} />
    </EmotionResult>
  )
}

const PredictedEmotionAccuracy = ({ accuracy }) => {
  let color = ''
  // let accuracy_as_int = parseInt(accuracy)
  // if (accuracy_as_int <= 30.0) {
  //   color = '#FA7E7E'
  // } else if (accuracy_as_int <= 65.0) {
  //   color = '#B5B760'
  // } else {
  //   color = '#60B763'
  // }

  let EmotionAccuracy = styled.span`
    color: ${(props) => props.color};
    margin-right: 5px;
  `

  return <EmotionAccuracy color={color}>{accuracy}</EmotionAccuracy>
}

export const ItemResult = ({
  phrase,
  predicted_emotion,
  accuracy,
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
      <td className="font-primary font-bold uppercase text-[15px] pl-7">
        {predicted_emotion.split(', ').map((emotion, index) => {
          // let accuracy = accuracy.split(', ')
          return (
            <PredictedEmotionResult
              predicted_emotion={emotion}
              key={index}
              accuracy={accuracy.split(', ')[index]}
            />
          )
        })}
      </td>
      {/* <td className="font-primary font-bold pl-0 pr-8 py-5 text-[15px]">
        {accuracy.split(', ').map((ac, index) => {
          return <PredictedEmotionAccuracy key={index} accuracy={ac} />
        })}
      </td> */}
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
