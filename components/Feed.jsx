"use client";

import TaskList from "./TaskList";

// Plan
// - create search bar
//   - use onChange to update search text
// - create list of everyones tasks below search
//   - need to prepopulate prior on first render (fetch all tasks)
//   - create component for each rendered task

const Feed = () => {

  return (
    <section className="feed">
      <form action="" className="search_input_container relative w-full flex justify-center">
          <input
            type="text"
            placeholder="Search for a task"
            className="search_input w-full focus:outline-none"
          />
      </form>

      <TaskList tasks={""} handleClick={() => {}} />
    </section>
  );
};

export default Feed;
