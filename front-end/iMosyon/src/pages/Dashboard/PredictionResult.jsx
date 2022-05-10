import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/pro-solid-svg-icons'

import Sidebar from '@/components/dashboard/sidebar'
import MainContent from '@/components/dashboard/main-content'
import Navbar from '@/components/dashboard/navbar'
// import Loading from '@/components/dashboard/loading'
import ItemResult from '@/components/dashboard/home/ItemResult'

export const PredictionResult = () => {
  const id = useParams().id
  const notify = ({ message, error }) => {
    if (error) {
      toast.error(message)
    } else {
      toast.success(message, {})
    }
  }
  const [predictionData, setPredictionData] = useState(null)

  const getPredictionResult = () => {
    axios({
      method: 'get',
      url: `/api/predict/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setPredictionData(response.data)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  const deleteWord = (delete_id) => {
    axios({
      url: '/api/user/delete-word',
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': Cookies.get('csrf_access_token'),
      },
      data: {
        id: delete_id,
      },
    })
      .then((response) => {
        notify({ message: response.data.message, error: false })
        getPredictionResult()
      })
      .catch((error) => {
        if (error.response.data.message) {
          notify({ message: error.response.message, error: true })
        } else {
          notify({ message: 'Something went wrong.', error: true })
        }
      })
  }

  const parseDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Manila',
    })
  }

  useEffect(() => {
    getPredictionResult()
    console.log('initiated')
  }, [])

  useEffect(() => {
    console.log(predictionData)
  }, [predictionData])

  return (
    <div className="p-0 overflow-x-hidden">
      <Sidebar />
      <MainContent>
        <Navbar></Navbar>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <h2 className="text-2xl mb-1 text-primary-white font-primary font-bold">
          Prediction Result
        </h2>
        {predictionData ? (
          <>
            <div className="py-4 flex flex-row justify-start align-middle gap-5">
              <div className="p-9 bg-primary-dark rounded-md flex flex-col justify-start items-start grow border border-solid border-[#54595E] border-l-[#fff] border-l-4">
                <div className="text-primary-white font-primary text-xl flex flex-row justify-evenly gap-2 items-baseline">
                  <p className="h-7">ID:</p>
                  <p className="text-sm">{id}</p>
                </div>
                <div className="text-primary-white font-primary text-xl flex flex-row justify-evenly gap-2 items-baseline">
                  <p className="h-7">Date Created:</p>
                  <p className="text-sm">
                    {parseDate(predictionData.date_created)}
                  </p>
                </div>
              </div>
              <div className="p-9 bg-primary-dark rounded-md flex flex-col justify-start items-center grow border border-solid border-[#54595E] border-l-[yellow] border-l-4">
                <div className="text-primary-white font-primary text-xl flex flex-col gap-2 align-middle justify-center items-center">
                  <h1 className="text-[#FFD873]">Total Sentences</h1>
                  <p>{predictionData.total_words}</p>
                </div>
              </div>
            </div>
            <table className="table-auto bg-secondary-dark p-4 h-auto lg:w-full rounded-xl drop-shadow-xl">
              <thead className="bg-[#282A2C]">
                <tr>
                  <th className="text-[#54595E] font-primary font-bold uppercase text-[12px] py-4 pr-4 pl-8 text-left rounded-tl-xl">
                    Sentence/Phrase
                  </th>
                  <th className="text-[#54595E] font-primary font-bold uppercase text-[12px] pl-8 text-left">
                    Predicted Emotion
                  </th>
                  {/* <th className="text-[#54595E] font-primary font-bold uppercase text-[12px] py-4 pr-4 text-left">
                    Accuracy %
                  </th> */}
                  <th className="text-[#54595E] font-primary font-bold uppercase text-[12px] py-4 pr-10 text-left rounded-tr-xl"></th>
                </tr>
              </thead>
              <tbody>
                {predictionData.predicted_words.map((item, index) => {
                  return (
                    <ItemResult
                      key={index}
                      phrase={item.word}
                      predicted_emotion={item.emotion}
                      accuracy={item.accuracy}
                      deleteWord={() => deleteWord(item.id)}
                    />
                  )
                })}

                <tr>
                  <td
                    className="text-primary-white font-primary font-bold pl-8 pr-8 py-5 text-[15px]"
                    colSpan={4}
                  >
                    <div className="flex flex-row items-center p-0 justify-around">
                      <div className="mr-auto text-[#54595E]">
                        Showing {predictionData.total_words} of{' '}
                        {predictionData.total_words} results
                      </div>
                      <div>
                        <CSVLink
                          filename={`iMosyon-Result-${predictionData.id}`}
                          data={[
                            ['Sentence/Phrase', 'Predicted Emotion'],
                            ...predictionData.predicted_words.map((word) => {
                              let accuracies = word.accuracy.split(', ')
                              return [
                                word.word,
                                word.emotion.split(', ').map((e, index) => {
                                  return e + ' - ' + accuracies[index] + ' '
                                }),
                              ]
                            }),
                          ]}
                          className="bg-secondary-dark hover:bg-primary-dark px-8 py-2 rounded-sm border-solid border border-[#404449]"
                        >
                          Export to File
                        </CSVLink>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="text-primary-white px-5 py-10 text-center">
              <div>
                <FontAwesomeIcon icon={faSpinner} className="fa-spin text-xl" />
                <br />
                <span className="text-placeholder font-sans">
                  Fetching Data
                </span>
              </div>
            </div>
          </>
        )}
      </MainContent>
    </div>
  )
}

export default PredictionResult
