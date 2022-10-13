import React from 'react'
import { ReactComponent as Plus } from "./plus.svg"
import { ReactComponent as Thumbnail} from "./sample.svg"

const Outlet = (props : any) => {
  const { frame } = props;
  return (
    <div className='w-28 h-28 border-4 border-outline rounded-xl border-dashed bg-empty flex flex-col justify-center items-center'>
      <Plus className='w-5 h-5'/>
    </div>
  )
}

export default Outlet