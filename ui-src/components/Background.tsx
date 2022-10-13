/// <reference types="vite-plugin-svgr/client" />
import React from 'react'
import { ReactComponent as Logo} from "./rembo.svg"

type Props = {
  children?: React.ReactNode;
};

export default function Background(props : Props) {
  return (
    <div className='w-[550px] h-[400px] flex flex-col'>
      <div className="w-full pl-5 pt-5">
        <Logo />
      </div>
      <div className="mx-[102px] mb-12 h-full flex flex-col items-center">
      {props.children}
      </div>
    </div>
  )
}
