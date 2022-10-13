import React from 'react'
import Background from '../components/Background'
import Outlet from '../components/Outlet'

const SavedFrame = (props : any) => {
  return (
    <Background>
      <div className="flex flex-col gap-y-8 items-center">
        <div className='font-sans font-bold text-gray-900 text-md flex flex-row items-center justify-center w-full text-center'>Frame saved! You'll be able to view all saved frames in the extension.</div>
        <Outlet {...props} />
        <form>
          <button className="w-48 h-11 bg-primary hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded text-md rounded-lg focus:outline-none focus:shadow-outline" type="submit">
            Save another frame
          </button>
        </form>
      </div>
    </Background>
  )
}

export default SavedFrame