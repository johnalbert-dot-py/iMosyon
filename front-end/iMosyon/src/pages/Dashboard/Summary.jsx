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
import { CSVLink } from 'react-csv'

import { Bar } from 'react-chartjs-2'
import { DateRange } from 'react-date-range'
import { ToastContainer, toast } from 'react-toastify'
import Cookies from 'js-cookie'
import axios from 'axios'

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
    x: {
      ticks: {
        color: [
          'rgba(250, 126, 126, 1)',
          'rgba(115, 154, 255, 1)',
          'rgba(233, 99, 99, 1)',
          'rgba(88, 150, 90, 1)',
          'rgba(255, 216, 115, 1)',
          'rgba(227, 237, 246, 1)',
          'rgba(202, 115, 255, 1)',
          'rgba(132, 153, 174, 1)',
          'rgba(181, 183, 96, 1)',
          'rgba(96, 183, 99, 1)',
        ],
      },
    },
    y: {
      ticks: {
        color: '#fff',
      },
    },
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

  const backgroundColor = [
    'rgba(250, 126, 126, 0.5)',
    'rgba(115, 154, 255, 0.5)',
    'rgba(233, 99, 99, 0.5)',
    'rgba(88, 150, 90, 0.5)',
    'rgba(255, 216, 115, 0.5)',
    'rgba(227, 237, 246, 0.5)',
    'rgba(202, 115, 255, 0.5)',
    'rgba(132, 153, 174, 0.5)',
    'rgba(181, 183, 96, 0.5)',
    'rgba(96, 183, 99, 0.5)',
  ]

  const [fetching, setFetching] = useState(false)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [data, setData] = useState({})
  const [datasets, setDataSets] = useState([])

  function csvData() {
    console.log('datasets: ', datasets)
    return [
      ['iMosyon Prediction Result Summary'],
      [''],
      [
        'From ' +
          date[0].startDate.toLocaleString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Manila',
          }) +
          ' To ' +
          date[0].endDate.toLocaleString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Manila',
          }),
      ],
      ['', ''],
      ...labels.map((l, index) => [l, datasets.length ? datasets[index] : 0]),
    ]
  }

  const getDataOnDate = () => {
    let _date = date[0]
    let starting_date =
      _date.startDate.getFullYear() +
      '-' +
      (_date.startDate.getMonth() + 1) +
      '-' +
      _date.startDate.getDate()

    let ending_date =
      _date.endDate.getFullYear() +
      '-' +
      (_date.endDate.getMonth() + 1) +
      '-' +
      _date.endDate.getDate()

    setFetching(true)
    axios({
      url: '/api/user/my-predictions-by-date',
      method: 'POST',
      withCredentials: true,
      data: {
        starting_date: starting_date,
        end_date: ending_date,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': Cookies.get('csrf_access_token'),
      },
    }).then((response) => {
      setFetching(false)
      setData({
        labels,
        datasets: [
          {
            label: 'Count',
            data: response.data.results,
            borderColor: '#fff',
            backgroundColor: backgroundColor,
            borderWidth: 2,
          },
        ],
      })
      setDataSets(response.data.results)
    })
  }

  useEffect(() => {
    setData({
      labels,
      datasets: [
        {
          label: 'Count',
          data: labels.map(() => 0),
          borderColor: 'rgb(12,255,212)',
          backgroundColor: backgroundColor,
          borderWidth: 2,
        },
      ],
    })
  }, [])

  useEffect(() => {
    getDataOnDate()
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
                {fetching ? (
                  <div className="text-primary-white text-center w-full self-center">
                    <div>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="fa-spin text-xl"
                      />
                      <br />
                      <span className="text-placeholder font-sans">
                        Fetching Data
                      </span>
                    </div>
                  </div>
                ) : (
                  <Bar options={options} data={data} />
                )}
              </div>
              <div className="flex flex-col gap-2 items-start justify-center">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <CSVLink
                  filename={
                    'iMosyon-Result-' +
                    new Date().toLocaleString('en-US', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric',
                      timeZone: 'Asia/Manila',
                    }) +
                    '.csv'
                  }
                  data={csvData()}
                  className="bg-primary-blue w-full px-9 py-2 rounded-md text-center hover:bg-opacity-50 text-primary-white"
                >
                  Export to File
                </CSVLink>
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
