import { React, useState } from 'react'

export const TextSection = ({ setUploadText, setPage, props }) => {
  const [phrase, setPhrase] = useState([])
  return (
    <>
      <h2 className="text-2xl mb-1 text-primary-white font-primary font-bold">
        Input your sentence / phrase / word here:
      </h2>

      <textarea
        name="phrase"
        id="phrase"
        value={phrase}
        onChange={(e) => {
          setPhrase([e.target.value])
        }}
        rows="10"
        placeholder="Type your sentence / phrase / word here..."
        className="
        bg-secondary-dark
        focus:outline-placeholder
        focus:outline-1
        border-0
        text-primary-white
        px-4
        py-4
        rounded-lg
        border-none
        outline-none
        w-full
        resize-none
        font-sans"
        required
      ></textarea>
      <button
        onClick={() => {
          setUploadText(phrase)
        }}
        className="px-8 py-5 bg-secondary-dark mt-4 text-primary-white rounded-md drop-shadow-lg border-2 border-primary-dark-light border-solid hover:bg-opacity-50 float-right"
      >
        Start Predicting
      </button>

      <button
        onClick={() => {
          setPage('upload')
        }}
        className="px-8 py-5 bg-primary-blue mt-4 text-primary-white rounded-md drop-shadow-lg border-2 border-primary-dark-light border-solid hover:bg-opacity-50 float-right mr-2"
      >
        Upload File
      </button>
    </>
  )
}

export default TextSection
