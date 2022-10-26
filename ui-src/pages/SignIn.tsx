import React, { useState, useContext, useEffect } from 'react'
import Background from '../components/Background'
import { UserContextData } from '../context/types'
import UserContext from '../context/User/userContext'
import _ from "lodash";

const SignIn = (props: any) => {
  const [id, setId] = useState('')
  const [error , setError] = useState(false)
  const userContext = useContext<UserContextData>(UserContext);
  const { setUser, user } = userContext;


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }
  const handleClick = async () => {
    const validId = await setUser(id);
    if (!validId) {
      console.log('Invalid Rembo ID');
      setError(true);
      _.delay(() => setError(false), 1000);
    }
  }

  useEffect(() => {setId(user?.id || '') }, [user])
  useEffect(() => {setId(props.storedId)}, [props.storedId])

  return (
    <Background>
      <div className="w-full h-full justify-center flex flex-col">
        <div className="flex flex-col gap-y-4 items-center">
          <div className='font-sans font-bold text-gray-900 text-xl flex flex-row items-center justify-center w-full'>Connect to your Rembo account!</div>
          {error ? <input className="w-56 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-red-500 leading-tight focus:outline-none focus:shadow-outline text-sm" id="id" type="id" value="Invalid rembo id" disabled/> : 
          <input className="w-56 shadow appearance-none border border-default rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-400 text-sm" id="id" type="id" placeholder="Enter your rembo id" value={id} onChange={handleChange} />}
          <button className="w-32 bg-primary hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline" onClick={handleClick}>
            Link Account
          </button>
        </div>
      </div>
    </Background>
  )
}

export default SignIn