import { React } from 'react'
import { useParams } from 'react-router-dom'

import Sidebar from '@/components/dashboard/sidebar'
import MainContent from '@/components/dashboard/main-content'
import Navbar from '@/components/dashboard/navbar'
import Loading from '@/components/dashboard/loading'
import ItemResult from '@/components/dashboard/home/ItemResult'

export const PredictionResult = () => {
  const id = useParams().id

  return (
    <div className="p-0 overflow-x-hidden">
      <Sidebar />
      <MainContent>
        <Navbar>
          <button className="rounded-md text-primary-white bg-primary-blue px-6 py-3 hover:bg-opacity-80">
            Log Out
          </button>
        </Navbar>
        <h2 className="text-2xl mb-1 text-primary-white font-primary font-bold">
          Prediction Result
        </h2>

        <div className="py-4 flex flex-row justify-start align-middle gap-5">
          <div className="p-9 bg-primary-dark rounded-md flex flex-col justify-start items-start grow border border-solid border-[#54595E] border-l-[#fff] border-l-4">
            <div className="text-primary-white font-primary text-xl flex flex-row justify-evenly gap-2 items-baseline">
              <p className="h-7">ID:</p>
              <p className="text-sm">{id}</p>
            </div>
            <div className="text-primary-white font-primary text-xl flex flex-row justify-evenly gap-2 items-baseline">
              <p className="h-7">Date Created:</p>
              <p className="text-sm">04-25-2022</p>
            </div>
          </div>
          <div className="p-9 bg-primary-dark rounded-md flex flex-col justify-start items-center grow border border-solid border-[#54595E] border-l-[yellow] border-l-4">
            <div className="text-primary-white font-primary text-xl flex flex-col gap-2 align-middle justify-center items-center">
              <h1 className="text-[#FFD873]">Total Words</h1>
              <p>100</p>
            </div>
          </div>
          <div className="p-9 bg-primary-dark rounded-md flex flex-col justify-center items-center grow border border-solid border-[#54595E] border-l-[#38ff3d] border-l-4">
            <div className="text-primary-white font-primary text-xl flex flex-col gap-2 align-middle justify-center items-center">
              <h1 className=" text-[#38ff3d]">Most Predicted Emotion</h1>
              <p className="">JOY</p>
            </div>
          </div>
          <div className="p-9 bg-primary-dark rounded-md flex flex-col justify-center items-center grow border border-solid border-[#54595E] border-l-[#FA7E7E] border-l-4">
            <div className="text-primary-white font-primary text-xl flex flex-col gap-2 align-middle justify-center items-center">
              <h1 className="text-[#FA7E7E]">Least Predicted Emotion</h1>
              <p>ANGER</p>
            </div>
          </div>
        </div>

        <table className="table-auto bg-secondary-dark p-4 h-auto lg:w-full rounded-xl drop-shadow-xl">
          <thead className="bg-[#282A2C]">
            <tr>
              <th className="text-[#54595E] font-primary font-bold uppercase text-[12px] py-4 pr-4 pl-8 text-left rounded-tl-xl">
                Sentence/Phrase
              </th>
              <th className="text-[#54595E] font-primary font-bold uppercase text-[12px] py-4 pr-4 pl-8 text-left">
                Predicted Emotion
              </th>
              <th className="text-[#54595E] font-primary font-bold uppercase text-[12px] py-4 pr-4 text-left">
                Accuracy %
              </th>
              <th className="text-[#54595E] font-primary font-bold uppercase text-[12px] py-4 pr-10 text-left rounded-tr-xl"></th>
            </tr>
          </thead>
          <tbody>
            <ItemResult
              phrase="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              predicted_emotion="Joy"
              accuracy="0.5"
            />

            <tr
              style={{
                boxShadow:
                  'inset 0px -10px 0px -9px #D9E9F5, inset 0px 10px 0px -9px #D9E9F5;',
              }}
            >
              <td
                className="text-primary-white font-primary font-bold pl-8 pr-8 py-5 text-[15px]"
                colSpan={4}
              >
                <div className="flex flex-row items-center p-0 justify-around">
                  <div className="mr-auto text-[#54595E]">
                    Showing 1 of 20 results
                  </div>
                  <div>
                    <button className="bg-secondary-dark hover:bg-primary-dark px-8 py-2 rounded-sm border-solid border border-[#404449]">
                      Export to Excel
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </MainContent>
    </div>
  )
}

export default PredictionResult
