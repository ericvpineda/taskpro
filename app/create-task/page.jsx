'use client'

import Form from "@components/Form"
import { useState } from "react"

const CreateTask = () => {

  const [taskHandler, setTaskHandler] = useState({
    namee: "",
    desc: "",
    status: "",
    date: new Date()
  })

  const [isSubmitHandler, setIsSubmitHandler] = useState(false)

  const formSubmitHandler = () => {

  }

  return (
    <Form
    type="Create"
    task={taskHandler}
    setTask={setTaskHandler}
    setIsSubmit={setIsSubmitHandler}
    isSubmit={isSubmitHandler}
    formSubmit={formSubmitHandler}
    ></Form>
  )
}

export default CreateTask