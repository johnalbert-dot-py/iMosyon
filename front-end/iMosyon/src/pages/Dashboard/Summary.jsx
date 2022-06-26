import { React, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import faker from 'faker'
import { DateRange } from 'react-date-range'
import { ToastContainer, toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/pro-solid-svg-icons'

import Sidebar from '@/components/dashboard/sidebar'
import MainContent from '@/components/dashboard/main-content'
import Navbar from '@/components/dashboard/navbar'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const notify = ({ message, error }) => {
  if (error) {
    toast.error(message)
  } else {
    toast.success(message, {})
  }
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'iMosyon Data Summary',
    },
  },
  fill: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
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
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])
  const [data, setData] = useState({})
  const [datasets, setDataSets] = useState([])

  const getDataOnDate = () => {}

  useEffect(() => {
    setDataSets([
      {
        label: 'Count of Predicted Emotion',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: 'rgb(12,255,212)',
        backgroundColor: ['rgba(12,255,212, 0.5)', 'rgba(12,255,212, 0.5)'],
        borderWidth: 2,
      },
    ])
  }, [])

  useEffect(() => {
    setData({
      labels,
      datasets: datasets,
    })
  }, [datasets])

  useEffect(() => {
    console.log('Start Date: ' + date[0].startDate)
    console.log('End Date: ' + date[0].endDate)
  }, [date])

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
        <div className=" flex flex-row gap-5 justify-start items-center sm:flex-wrap lg:flex-nowrap ">
          {JSON.stringify(data) !== '{}' ? (
            <>
              <div style={{ width: '100%', height: '500px' }}>
                <Bar options={options} data={data} />
              </div>
              <div className="flex flex-col gap-2 items-start justify-center">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <button
                  className="bg-primary-blue w-full px-9 py-2 rounded-md text-center hover:bg-opacity-50 text-primary-white"
                  onClick={() => {}}
                >
                  Export Summary
                </button>
              </div>
            </>
          ) : (
            <div className="text-primary-white text-center w-full self-center">
              <div>
                <FontAwesomeIcon icon={faSpinner} className="fa-spin text-xl" />
                <br />
                <span className="text-placeholder font-sans">
                  Fetching Data
                </span>
              </div>
            </div>
          )}
        </div>
      </MainContent>
    </div>
  )
}

export default Summary
