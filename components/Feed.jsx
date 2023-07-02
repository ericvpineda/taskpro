"use client";

import TaskList from "./TaskList";
import { useState, useEffect } from "react";

// Plan
// - create search bar
//   - use onChange to update search text
// - create list of everyones tasks below search
//   - need to prepopulate prior on first render (fetch all tasks)
//   - create component for each rendered task

const Feed = () => {

  // Note: need to set to array to be able to itereate over
  const [tasks, setTasks] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [sortQuery, setSortQuery] = useState("")

  useEffect(() => {

    const fetchTasks = async () => {
     const response = await fetch('/api/task');
     const data = await response.json()
     setAllTasks(data)
     setTasks(data) 
    }
    fetchTasks()
  }, [])

  // Note: Use debounce function to prevent unnecessary search calls
  useEffect(() => {

    const timeout = setTimeout(() => {

      // Filter results by name, status, date, author
      if (searchInput.length == 0 && allTasks.length > 0) {
        setTasks(allTasks)
      } else if (searchInput) {
        const regex = new RegExp(searchInput)
        const filteredTasks = allTasks.filter(task => 
          regex.test(task.name) ||
          regex.test(task.status) ||
          regex.test(task.date) ||
          regex.test(task.desc) ||
          regex.test(task.author.username)
      )
      setTasks(filteredTasks)
    }

    }, 500)

    return () => clearTimeout(timeout)
  }, [searchInput])

  useEffect(() => {

    let sortedTasks = []
    if (sortQuery == "author") {
      // Note: sort() mutates array and returns array, need to copy and assign to new array 
      sortedTasks = [...tasks].sort((a,b) => (a.author.username.toLowerCase() < b.author.username.toLowerCase()) ? -1 : 1)
    } else if (sortQuery == "name") {
      sortedTasks = [...tasks].sort((a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1)
    } else if (sortQuery == "desc") {
      sortedTasks = [...tasks].sort((a,b) => (a.desc.toLowerCase() < b.desc.toLowerCase()) ? -1 : 1)
    } else if (sortQuery == "status") {
      sortedTasks = [...tasks].sort((a,b) => (a.status.toLowerCase() < b.status.toLowerCase()) ? -1 : 1)
    } else if (sortQuery == "date") {
      sortedTasks = [...tasks].sort((a,b) => (a.date.toLowerCase() < b.date.toLowerCase()) ? -1 : 1)
    }

    if (sortQuery != "") {
      setTasks(sortedTasks)
    }
    
    setSortQuery("")

  }, [sortQuery, tasks])


  return (
    <section className="feed overflow-hidden">
      <form action="" className="search_input_container relative w-full flex justify-center">
          <input
            type="text"
            placeholder="Search tasks by any keyword..."
            className="search_input w-full focus:outline-none text-center"
            onChange={e => setSearchInput(e.target.value)}
          />
      </form>

      <TaskList tasks={tasks} sortBy={setSortQuery}/>
    </section>
  );
};

export default Feed;
