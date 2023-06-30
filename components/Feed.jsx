"use client";

// import DatePicker from "react-datepicker";
// import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TaskList from "./TaskList";

// Plan
// - create search bar
//   - use onChange to update search text
// - create list of everyones tasks below search
//   - need to prepopulate prior on first render (fetch all tasks)
//   - create component for each rendered task

const Feed = () => {
//   const [startDate, setStartDate] = useState(new Date());

  return (
    <section className="feed">
      <form action="" className="search_input_container relative w-full flex justify-center">
          <input
            type="text"
            placeholder="Search for a task"
            className="search_input w-full focus:outline-none"
          />
        {/* <div className="search_input_container">
          <input
            className="search_input"
            type="text"
            placeholder="Enter new task title"
          />
          <select className="search_input" name="progrss" id="progress">
            <option value="default" selected>
              -- Select Status --
            </option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <DatePicker
            selected={startDate}
            className="search_input text-center hover:cursor-pointer"
            onChange={(date) => setStartDate(date)}
          />
        </div> */}
      </form>

      <TaskList tasks={""} handleClick={() => {}} />
    </section>
  );
};

export default Feed;
