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
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {

    const fetchTasks = async () => {
     const response = await fetch('/api/task');
     const data = await response.json()
     setTasks(data) 
     setAllTasks(data)
    }
    fetchTasks()
  }, [])

  // Note: Use debounce function to prevent unnecessary search calls
  useEffect(() => {

    const timeout = setTimeout(() => {

      // Filter results by name, status, date, author
      // - Later: filter by description (key words)
      if (searchInput == "") {
        setTasks(allTasks)
      } else {
        const regex = new RegExp(searchInput)
        const filteredTasks = allTasks.filter(task => 
          regex.test(task.name) ||
          regex.test(task.status) ||
          regex.test(task.date) ||
          regex.test(task.author.username)
      )
      setTasks(filteredTasks)
    }

    }, 1000)

    return () => clearTimeout(timeout)
  }, [searchInput])

  return (
    <section className="feed">
      <form action="" className="search_input_container relative w-full flex justify-center">
          <input
            type="text"
            placeholder="Search for a task..."
            className="search_input w-full focus:outline-none text-center"
            onChange={e => setSearchInput(e.target.value)}
          />
      </form>

      <TaskList tasks={tasks} handleClick={() => {}} />
    </section>
  );
};

export default Feed;
