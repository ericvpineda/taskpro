'use client'

import Form from "@components/Form"
import { useState } from "react"

const CreateTask = () => {

  const [taskHandler, setTaskHandler] = useState({
    name: "",
    desc: "",
    status: "",
    date: new Date()
  })

  const [isSubmitHandler, setIsSubmitHandler] = useState(false)

  const formSubmitHandler = (e) => {
    e.preventDefault() 

    console.log("DEBUG: event=", e.target)

  }

  return (
    <Form
    type="Create"
    task={taskHandler}
    setTask={setTaskHandler}
    isSubmit={isSubmitHandler}
    formSubmit={formSubmitHandler}
    ></Form>
  )
}

export default CreateTask