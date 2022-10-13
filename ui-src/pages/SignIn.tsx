import React, { useState, useContext, useEffect } from 'react'
import Background from '../components/Background'
import { UserContextData } from '../context/types'
import UserContext from '../context/User/UserContext'

const SignIn = () => {
  const [id, setId] = useState('')
  const userContext = useContext<UserContextData>(UserContext);
  const { setUser, user } = userContext;


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value)
  }
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    alert('This id is: ' + id);
    setUser(id);
    event.preventDefault();
  }


  useEffect(() => {setId(user?.id || '') }, [user])

  return (
    <Background>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4 items-center">
          <div className='font-sans font-bold text-gray-900 text-xl flex flex-row items-center justify-center w-full'>Connect to your Rembo account!</div>

          <input className="w-56 shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" id="id" type="id" placeholder="Enter your rembo id" value={id} onChange={handleChange} />
          <button className="w-32 bg-primary hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline" type="submit">
            Link Account
          </button>
        </div>
      </form>
    </Background>
  )
}

export default SignIn