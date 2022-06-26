import { React, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import faker from 'faker'

import Sidebar from '@/components/dashboard/sidebar'
import MainContent from '@/components/dashboard/main-content'
import Navbar from '@/components/dashboard/navbar'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)
let delayed
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'iMosyon Data Summary',
    },
  },
  animation: {
    onComplete: () => {
      delayed = true
    },
    delay: (context) => {
      let delay = 0
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100
      }
      return delay
    },
  },
  tension: 0.3,
}

export const Summary = (props) => {
  const labels = [
    'Anger',
    'Annoyed',
    'Disgust',
    'Fear',
    'Joy',
    'Others',
    'Outraged',
    'Sadness',
    'Strong',
    'Upset',
  ]
  const [data, setData] = useState({})
  const [datasets, setDataSets] = useState([])

  useEffect(() => {
    setDataSets([
      {
        label: 'Dataset 1',
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 }),
        ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 }),
        ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 1)',
      },
    ])
  }, [])

  useEffect(() => {
    setData({
      labels,
      datasets: datasets,
    })
  }, [datasets])

  return (
    <div className="p-0 overflow-x-hidden">
      <Sidebar />
      <MainContent>
        <Navbar></Navbar>
        <h2 className="text-4xl mb-1 text-primary-white font-sans font-semibold">
          Data Summary
        </h2>
        <p className="text-placeholder font-primary font-semibold">
          You can see the summary of your predictions here.
        </p>
        {/* <div className="py-4 flex flex-row justify-start align-middle gap-5">
          <div className="p-9 bg-primary-dark rounded-md flex flex-col justify-start items-center grow border border-solid border-[#54595E] border-l-[yellow] border-l-4">
            <div className="text-primary-white font-primary text-xl flex flex-col gap-2 align-middle justify-center items-center">
              <h1 className="text-[#FFD873]">Total Sentences Predicted</h1>
              <p className="h-7">201</p>
            </div>
          </div>
          <div className="p-9 bg-primary-dark rounded-md flex flex-col justify-start items-center grow border border-solid border-[#54595E] border-l-[#55dff7] border-l-4">
            <div className="text-primary-white font-primary text-xl flex flex-col gap-2 align-middle justify-center items-center">
              <h1 className="text-[#55dff7]">Most Predicted Emotion</h1>
            </div>
          </div>
          <div className="p-9 bg-primary-dark rounded-md flex flex-col justify-start items-center grow border border-solid border-[#54595E] border-l-[#f75555] border-l-4">
            <div className="text-primary-white font-primary text-xl flex flex-col gap-2 align-middle justify-center items-center">
              <h1 className="text-[#f75555]">Least Predicted Emotion</h1>
            </div>
          </div>
        </div> */}
        {JSON.stringify(data) !== '{}' ? (
          <Line options={options} data={data} />
        ) : (
          ''
        )}
      </MainContent>
    </div>
  )
}

export default Summary
