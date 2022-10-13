import React, {useEffect, useState} from 'react'
import { ReactComponent as Plus } from "./plus.svg"
import { ReactComponent as Thumbnail} from "./sample.svg"



const Outlet = (props : any) => {
  const { frame } = props;

  const canvas = document.createElement('canvas')

  
  const [image, setImage] = useState("")

  useEffect(() => {
    if (frame) {
      const url = URL.createObjectURL(new Blob([frame.image]))
      setImage(url)
    } 
  }, [frame])


  return (
    image ? (<img src={image} className='w-28 h-28 border-4 border-outline rounded-xl border-dashed object-cover'/>) :
    <div className='w-28 h-28 border-4 border-outline rounded-xl border-dashed bg-empty flex flex-col justify-center items-center'>
      <Plus className='w-5 h-5'/>
    </div>
  )
}

export default Outlet