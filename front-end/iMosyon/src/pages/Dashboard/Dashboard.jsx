import { React, useEffect, useState } from 'react'
import { read, utils } from 'xlsx/xlsx.mjs'

import Sidebar from '@/components/dashboard/sidebar'
import MainContent from '@/components/dashboard/main-content'
import Navbar from '@/components/dashboard/navbar'
import UploadSection from '@/components/dashboard/home/UploadSection'

import './index.css'

export const Dashboard = (props) => {
  useEffect(() => {
    document.title = 'Dashboard | iMosyon'
  })

  const [uploadedFiles, setUploadedFiles] = useState(null)
  const [words, setWords] = useState([])

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

  function setUpload(uploaded) {
    setUploadedFiles(uploaded)
  }

  return (
    <div className="p-0">
      <Sidebar />
      <MainContent>
        <Navbar>
          <button className="rounded-md text-primary-white bg-primary-blue px-6 py-3 hover:bg-opacity-80">
            Log Out
          </button>
        </Navbar>
        <UploadSection setUploadFiles={setUpload}></UploadSection>
      </MainContent>
    </div>
  )
}

export default Dashboard
