import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Sidebar from '@/components/dashboard/sidebar'
import MainContent from '@/components/dashboard/main-content'
import Navbar from '@/components/dashboard/navbar'
import { faSpinner } from '@fortawesome/pro-solid-svg-icons'
// import Loading from '@/components/dashboard/loading'
// import Error from '@/components/dashboard/error'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

export const Profile = (props) => {
  const navigate = useNavigate()
  const notify = ({ message, error }) => {
    if (error) {
      toast.error(message)
    } else {
      toast.success(message, {})
    }
  }
  const [usersPredictedWords, setUsersPredictedWords] = useState([])
  const parseDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Manila',
    })
  }

  const getPredictions = () => {
    axios({
      url: '/api/user/my-predictions',
      method: 'GET',
      withCredentials: true,
    }).then((response) => {
      if (response.data.words.length > 0) {
        setUsersPredictedWords(response.data.words)
      } else {
        setUsersPredictedWords(['empty'])
      }
      console.log('bruh', usersPredictedWords)
      console.log(response.data.words)
    })
  }

  const deletePrediction = (prediction_id) => {
    axios({
      method: 'delete',
      url: `/api/user/delete-prediction`,
      data: {
        prediction_id: prediction_id,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': Cookies.get('csrf_access_token'),
      },
      withCredentials: true,
    })
      .then((response) => {
        notify({ message: response.data.message, error: false })
        getPredictions()
      })
      .catch((error) => {
        notify({ message: 'Something went wrong', error: true })
      })
  }

  useEffect(() => {
    document.title = 'Profile | iMosyon'
  }, [])

  useEffect(() => {
    getPredictions()
  }, [])

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
        <h2 className="text-4xl mb-1 text-primary-white font-sans font-semibold">
          Profile
        </h2>
        <p className="text-placeholder font-primary font-semibold mb-5">
          Here you can see all the prediction results that you’ve got.
        </p>
        {usersPredictedWords.length > 0 ? (
          <>
            {usersPredictedWords[0] !== 'empty' ? (
              usersPredictedWords.map((word, index) => {
                console.log(word)
                return (
                  <>
                    <div
                      key={index}
                      className="bg-secondary-dark w-full h-auto rounded-md mt-3 px-8 py-6"
                    >
                      <div className="flex flex-row justify-between items-center">
                        {/* left */}
                        <div className="flex flex-col items-start text-primary-white">
                          <h3 className="text-xl">ID: {word.prediction_id}</h3>
                          <p className="text-md m-0 p-0">{word.count} Words</p>
                          <p className="text-md m-0 p-0">
                            {parseDate(word.created_at)}
                          </p>
                        </div>

                        {/* right */}

                        <div className="flex flex-row items-center align-center gap-2 text-primary-white">
                          <button
                            className="bg-primary-blue px-9 py-2 rounded-md text-center hover:bg-opacity-50"
                            onClick={() => {
                              navigate(
                                `/user/dashboard/prediction-result/${word.prediction_id}`,
                              )
                            }}
                          >
                            View
                          </button>
                          <button
                            className="bg-danger px-9 py-2 rounded-md text-center hover:bg-opacity-50"
                            onClick={() => deletePrediction(word.prediction_id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })
            ) : (
              <div className="text-center w-full py-9 text-placeholder text-3xl font-sans">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h2>You don't have any saved progress yet.</h2>
              </div>
            )}
          </>
        ) : (
          <div className="text-primary-white px-5 py-10 text-center">
            <div>
              <FontAwesomeIcon icon={faSpinner} className="fa-spin text-xl" />
              <br />
              <span className="text-placeholder font-sans">Fetching Data</span>
            </div>
          </div>
        )}
      </MainContent>
    </div>
  )
}

export default Profile
