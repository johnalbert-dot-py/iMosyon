import { React, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFolderPlus,
  faExclamationTriangle,
  faFileExcel,
  faFileCsv,
} from '@fortawesome/pro-solid-svg-icons'
import { faXmarkCircle } from '@fortawesome/pro-duotone-svg-icons'

const DragAndDropDiv = styled.div`
  background-color: #191a1b;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #929292;
  font-family: 'Nunito';
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='11' ry='11' stroke='${(
    props,
  ) =>
    props.color
      ? props.color
      : '%234D5155FF'}' stroke-width='4' stroke-dasharray='6%2c15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 11px;
`

const BrowseFile = styled.button`
  & {
    box-shadow: -7px -4px 14px rgba(66, 68, 70, 0.49),
      9px 10px 15px -7px #0c0b0b;
    border-radius: 8px;
    transition: 0.1s ease-in;
  }

  &:hover {
    box-shadow: -7px -4px 14px #0c0b0b,
      9px 10px 15px -7px rgba(66, 68, 70, 0.49);
  }
`

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const UploadSection = ({ setUploadFiles, setPage }) => {
  const [uploadedFiles, setUploadFilesLocal] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    setUploadFilesLocal(acceptedFiles)
  })
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept:
      '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    onDrop: onDrop,
  })

  const files = uploadedFiles.map((file, index) => {
    return (
      <div
        className="flex flex-row items-center justify-start gap-4"
        key={index}
      >
        <div id="fileExt">
          {file.name.split('.').pop() == 'xlsx' ? (
            <FontAwesomeIcon
              icon={faFileExcel}
              className="h-5/6 w-8 text-[#79A6B0]"
            ></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon
              icon={faFileCsv}
              className="h-5/6 w-8 text-[#79A6B0]"
            ></FontAwesomeIcon>
          )}
        </div>
        <div
          id="fileDetails"
          className="flex flex-col align-center justify-start"
        >
          <p className="text-2xl  text-primary-white font-primary font-bold">
            {file.name}
          </p>
          <p className="text-md mb-1 text-primary-white font-primary">
            {formatBytes(file.size)}
          </p>
        </div>
        <div id="removeFile" className="ml-auto">
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="text-[#B8BFC2] text-2xl hover:text-primary-white hover:cursor-pointer"
            onClick={() => {
              console.log('removing file')
              remove()
            }}
          />
        </div>
      </div>
    )
  })

  const remove = () => {
    setUploadFilesLocal([])
  }

  return (
    <>
      <h2 className="text-2xl mb-1 text-primary-white font-primary font-bold">
        Upload your Excel file here. (CSV is accepted too)
      </h2>
      <DragAndDropDiv
        {...getRootProps({ className: 'dropzone' })}
        color={isDragAccept ? '%23799B69FF' : isDragReject ? '%23D26262FF' : ''}
      >
        <input {...getInputProps()} />
        <span>
          <FontAwesomeIcon
            icon={isDragReject ? faExclamationTriangle : faFolderPlus}
            className="text-8xl"
          />
        </span>
        <p className="text-2xl mt-2">Drag & Drop your file here</p>
        <p>or</p>
        <BrowseFile className="bg-secondary-dark px-10 py-3 mt-5 rounded-md text-primary-white hover:bg-primary-dark hover:bg-opacity-10">
          Browse File
        </BrowseFile>
      </DragAndDropDiv>
      <div className="mt-4">
        {uploadedFiles.length > 0 ? (
          <>
            <h2 className="text-2xl mb-1 text-primary-white font-primary font-bold">
              Uploaded File
            </h2>
            <div className="px-8 py-5 bg-secondary-dark rounded-[11px] flex flex-col align-center justify-start">
              {files}
            </div>
            <button
              onClick={() => {
                setUploadFiles(uploadedFiles[0])
              }}
              className="px-8 py-5 bg-secondary-dark mt-4 text-primary-white rounded-md drop-shadow-lg border-2 border-primary-dark-light border-solid hover:bg-opacity-50"
            >
              Start Predicting
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setPage('input')
            }}
            className="px-8 py-5 bg-primary-blue mt-4 text-primary-white rounded-md drop-shadow-lg border-2 border-primary-dark-light border-solid hover:bg-opacity-50 float-right mr-2"
          >
            Use Input Field
          </button>
        )}
      </div>
    </>
  )
}

export default UploadSection
