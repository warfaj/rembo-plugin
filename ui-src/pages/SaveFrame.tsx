import React from 'react'
import Background from '../components/Background'
import Outlet from '../components/Outlet'

const SaveFramePage = (props: any) => {
  return (
    <Background>
      <div className="flex flex-col gap-y-8 items-center mt-9">
        <div className='font-sans font-bold text-gray-900 text-md flex flex-row items-center justify-center w-full text-center'>Select a parent frame in the file and click "save" to view it in the extension.</div>
        <Outlet {...props} />
        {props.loading ? (<button className="bg-gray-300 text-gray-500  font-semibold py-2 px-4 rounded-lg text-md flex items-center justify-center" disabled>
          <div className="w-4 h-4 rounded-full animate-spin
                        border-4 border-solid border-primary border-t-transparent mr-3"></div>
          Processing...
        </button>) :
          (<button className="w-20 h-11 bg-gray-300 text-gray-500 hover:bg-primary hover:text-white font-semibold py-2 px-4 rounded-lg text-md focus:outline-none focus:shadow-outline" onClick={props.onClick} >
            Save
          </button>)}
      </div>
    </Background>
  )
}

export default SaveFramePage