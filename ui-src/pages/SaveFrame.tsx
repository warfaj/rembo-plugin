import React from 'react'
import Background from '../components/Background'
import Outlet from '../components/Outlet'

const SaveFramePage = (props: any) => {
  return (
    <Background>
      <div className="flex flex-col gap-y-8 items-center">
      <div className='font-sans font-bold text-gray-900 text-md flex flex-row items-center justify-center w-full text-center'>Select a parent frame in the file and click "save" to view it in the extension.</div>
      <Outlet {...props} />
          <button className="w-20 h-11 bg-gray-300 text-gray-500 hover:bg-primary hover:text-white font-semibold py-2 px-4 rounded-lg text-md focus:outline-none focus:shadow-outline" onClick={props.onClick} >
            Save
          </button>
      </div>
    </Background>
  )
}

export default SaveFramePage