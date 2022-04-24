import { React } from 'react'

export const MainContent = (props) => {
  return (
    <>
      <main className="bg-primary-dark h-auto min-h-screen lg:pb-10" {...props}>
        <div id="main-content">
          <section className="ml-0 md:ml-40 lg:ml-96 pl-10 pr-10">
            {props.children}
          </section>
        </div>
      </main>
    </>
  )
}

export default MainContent
