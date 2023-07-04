'use client'

import Image from "next/image"
import { useEffect } from "react"
import Link from "next/link"

// Note: props recieved are in object for, need to wrap with {} to get actual value
const TaskList = ({ tasks, sortBy }) => {

  return (
    <section className="task_table_wrapper">
      
      <div className="task_table_container">

        {/* Note: add resizing for smaller screen widths   */}
        <div className="task_table_header">

          <div id="task-author-img" className="task_table_header_cols" onClick={() => sortBy("author")}>Author</div>
          <div id="task-name" className="task_table_header_cols" onClick={() => sortBy("name")}>Task</div>
          <div id="task-desc" className="task_table_header_cols" onClick={() => sortBy("desc")}>Description</div>
          <div id="task-status" className="task_table_header_cols" onClick={() => sortBy("status")}>Status</div>
          <div id="task-due-date" className="task_table_header_cols" onClick={() => sortBy("date")}>Date</div>

        </div>

        {tasks && tasks.map((task) => {
          return (
          <Link className="task_table_row" key={task._id} href={`/profile/${task.author._id}`}>
              <div id="" className="task_table_row_item">
                <Image
                src={task.author.image}
                alt="user_image"
                width={40}
                height={40}
                className="rounded-full object-contain inline-block"
                ></Image>
                <span
                className="ml-3"
                >{task.author.username}</span>
                </div>
              <div id="" className="task_table_row_item">{task.name}</div>
              <div id="" className="task_table_row_item">{task.desc}</div>
              <div id="" className="task_table_row_item">{task.status}</div>
              <div id="" className="task_table_row_item">{new Date(task.date).toDateString()}</div>
          </Link>
          )
        })
        }

      </div>

    </section>
  )
}

export default TaskList