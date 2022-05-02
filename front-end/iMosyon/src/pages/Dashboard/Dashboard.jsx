import { React, useEffect, useState } from 'react'
import { read, utils } from 'xlsx/xlsx.mjs'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import Sidebar from '@/components/dashboard/sidebar'
import MainContent from '@/components/dashboard/main-content'
import Navbar from '@/components/dashboard/navbar'
import UploadSection from '@/components/dashboard/home/UploadSection'
import Loading from '@/components/dashboard/loading'
import Error from '@/components/dashboard/error'

import './index.css'
import axios from 'axios'

export const Dashboard = (props) => {
  useEffect(() => {
    document.title = 'Dashboard | iMosyon'
  })

  const navigate = useNavigate()
  const [uploadedFiles, setUploadedFiles] = useState(null)
  const [words, setWords] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errMessage, setErrMessage] = useState('')

  const processExcel = function (data) {
    const workbook = read(data, { type: 'binary' })
    const firstSheet = workbook.SheetNames[0]
    const excelRows = utils.sheet_to_csv(workbook.Sheets[firstSheet])
    setWords(excelRows.split('\n'))
  }

  const processCSV = function (data) {
    const csvRows = data.split('\n')
    setWords(csvRows)
  }

  useEffect(() => {
    if (uploadedFiles) {
      if (typeof FileReader !== 'undefined') {
        const reader = new FileReader()
        // get file extension
        const fileExtension = uploadedFiles.name.split('.').pop()
        if (fileExtension === 'xlsx' || fileExtension === 'csv') {
          if (reader.readAsBinaryString) {
            reader.onload = () => {
              processExcel(reader.result)
            }
            reader.readAsBinaryString(uploadedFiles)
          }
        }
      }
    }
    console.log(uploadedFiles)
  }, [uploadedFiles])

  useEffect(() => {
    if (words.length > 0) {
      axios({
        method: 'post',
        url: '/api/predict',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': Cookies.get('csrf_access_token'),
        },
        data: {
          words: words,
        },
        withCredentials: true,
      })
        .then((response) => {
          setIsLoading(false)
          if (response.data.success) {
            navigate('prediction-result/' + response.data.user_predict_id, {
              replace: true,
            })
          }
        })
        .catch((error) => {
          setIsLoading(false)
          setIsError(true)
          setErrMessage(error.response.data.message)
        })
    }
  }, [words])

  function setUpload(uploaded) {
    setUploadedFiles(uploaded)
    setIsLoading(true)
  }

  return (
    <div className="p-0 overflow-x-hidden">
      <Sidebar />
      <MainContent>
        <Navbar></Navbar>
        {!isLoading ? (
          <UploadSection setUploadFiles={setUpload}></UploadSection>
        ) : isError ? (
          <Error onClose={setIsError(false)}>{errMessage}</Error>
        ) : (
          <Loading></Loading>
        )}
      </MainContent>
    </div>
  )
}

export default Dashboard
