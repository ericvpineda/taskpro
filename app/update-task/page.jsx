"use client";

import Form from "@components/Form";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const UpdateTask = () => {
  
  // Dynamically name destructured variables
  const {data: session} = useSession()
  const router = useRouter()
  const [isSubmit, setIsSubmit] = useState(false);
  const taskId = useSearchParams().get('id')

  // NOTE: Can this be optimized to use event target values (rather than state)
  const [task, setTask] = useState({
    name: "",
    desc: "",
    status: "",
    date: new Date(),
  });

  useEffect(() => {

    if (taskId) {
        const getTask = async () => {
          const response = await fetch(`/api/task/${taskId}`)
          const data = await response.json()
          setTask({
            ...data,
            date: new Date(data.date),
          })
        }
        getTask()
    }

  }, [])
  
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    setIsSubmit(true);

    try {
      // TODO: create route to make new task in backend server
      const response = await fetch(`/api/task/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: task.name,
          desc: task.desc,
          status: task.status,
          date: task.date,
          userId: session?.user.id 
        })
      }) 

      // TODO: Add error response if response is not ok 
      if (response) {
        // Returns back to home page
        router.push("/")
      }
      
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmit(false)
    }

  };

  return (
    <Form
      type="Edit"
      task={task}
      setTask={setTask}
      isSubmit={isSubmit}
      formSubmit={formSubmitHandler}
    ></Form>
  );
};

export default UpdateTask;
