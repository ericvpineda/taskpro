'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const Profile = () => {

  // Steps:
  // 1. use effect to get current user and users tasks
  // 2. display all users tasks in scrollable task list
  // 3. remove user image/name in task list
  // 4. add ability for user to edit/delete tasks

  const {data: session} = useSession()
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    const getUserTasks = async () => {
        if (session) {
            try {
                
                const response = await fetch(`/api/users/${session?.user.id}/tasks`)
                const data = await response.json()
                setTasks(data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    getUserTasks()

  }, [session])
  

  return (
    <div>  Profile</div>
  )
}

export default Profile