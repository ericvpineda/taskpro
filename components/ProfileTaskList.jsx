'use client'

import Image from "next/image"
import { useEffect } from "react"
import Link from "next/link"

// Note: props recieved are in object for, need to wrap with {} to get actual value
const ProfileTaskList = ({ tasks, editTask, deleteTask, sortBy }) => {

  useEffect(() => {}, [tasks])

  return (
    <section className="task_table_wrapper">
      
      <div className="task_table_container">

        {/* Note: add resizing for smaller screen widths   */}
        <div className="task_table_header">

          <div id="task-name" className="task_table_header_cols" onClick={() => sortBy("name")}>Task</div>
          <div id="task-desc" className="task_table_header_cols" onClick={() => sortBy("desc")}>Description</div>
          <div id="task-status" className="task_table_header_cols" onClick={() => sortBy("status")}>Status</div>
          <div id="task-due-date" className="task_table_header_cols" onClick={() => sortBy("date")}>Date</div>
          <div id="task-action" className="task_table_header_cols">Action</div>

        </div>

        {tasks && tasks.map((task) => {
          return (<div key={task._id} className="task_table_row">
            <div id="" className="task_table_row_item">{task.name}</div>
            <div id="" className="task_table_row_item">{task.desc}</div>
            <div id="" className="task_table_row_item">{task.status}</div>
            <div id="" className="task_table_row_item">{task.date}</div>
            <div className="task_table_row_item">
                <Image
                    src="/icons/edit.svg"
                    alt="edit_icons"
                    width={18}
                    height={18}
                    className="inline-block mr-6 cursor-pointer"
                    onClick={() => editTask && editTask(task._id)}
                ></Image>
                <Image
                    src="/icons/delete.svg"
                    alt="edit_icons"
                    width={18}
                    height={18}
                    className="inline-block cursor-pointer"
                    onClick={() => deleteTask && deleteTask(task._id)}
                ></Image>
            </div>

          </div>)
        })
        }

      </div>

    </section>
  )
}

export default ProfileTaskList