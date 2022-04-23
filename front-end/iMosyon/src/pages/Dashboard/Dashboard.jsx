import { React, useEffect, useState } from 'react'
import { read, utils } from 'xlsx/xlsx.mjs'
import Cookies from 'js-cookie'

import Sidebar from '@/components/dashboard/sidebar'
import MainContent from '@/components/dashboard/main-content'
import Navbar from '@/components/dashboard/navbar'
import UploadSection from '@/components/dashboard/home/UploadSection'
import Loading from '@/components/dashboard/loading'

import './index.css'
import axios from 'axios'

export const Dashboard = (props) => {
  useEffect(() => {
    document.title = 'Dashboard | iMosyon'
  })

  const [uploadedFiles, setUploadedFiles] = useState(null)
  const [words, setWords] = useState([])
  const [predictedWords, setPredictedWords] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const processExcel = function (data) {
    const workbook = read(data, { type: 'binary' })
    const firstSheet = workbook.SheetNames[0]
    const excelRows = utils.sheet_to_csv(workbook.Sheets[firstSheet])
    setWords(excelRows.split('\n'))
  }

  useEffect(() => {
    if (uploadedFiles) {
      if (typeof FileReader !== 'undefined') {
        const reader = new FileReader()
        if (reader.readAsBinaryString) {
          reader.onload = () => {
            processExcel(reader.result)
          }
          reader.readAsBinaryString(uploadedFiles)
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
          setPredictedWords(response.data['results'])
        })
        .catch((error) => {
          console.log(error)
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
        <Navbar>
          <button className="rounded-md text-primary-white bg-primary-blue px-6 py-3 hover:bg-opacity-80">
            Log Out
          </button>
        </Navbar>
        {!isLoading ? (
          <UploadSection setUploadFiles={setUpload}></UploadSection>
        ) : (
          <Loading></Loading>
        )}
      </MainContent>
    </div>
  )
}

export default Dashboard
