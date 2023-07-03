"use client";

import Form from "@components/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateTask = () => {
  
  // Dynamically name destructured variables
  const {data: session} = useSession()
  const router = useRouter()
  const [isSubmit, setIsSubmit] = useState(false);
  // NOTE: Can this be optimized to use event target values (rather than state)
  const [task, setTask] = useState({
    name: "",
    desc: "",
    status: "not-started",
    date: new Date(),
  });
  
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    setIsSubmit(true);

    try {
      // TODO: create route to make new task in backend server
      const response = await fetch('/api/task/new', {
        method: 'POST',
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
        router.push(`/profile/${session?.user.id}`);
      }
      
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmit(false)
    }

  };

  return (
    <Form
      type="Create"
      task={task}
      setTask={setTask}
      isSubmit={isSubmit}
      formSubmit={formSubmitHandler}
    ></Form>
  );
};

export default CreateTask;
