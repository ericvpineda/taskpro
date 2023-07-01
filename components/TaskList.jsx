'use client'

import Link from "next/link"

const TaskList = (tasks) => {
  return (
    <section className="task_table_wrapper">
      
      <div className="task_table_container">

        {/* Note: add resizing for smaller screen widths   */}
        <div className="task_table_header">

          <div id="task-author-img" className="task_table_header_cols">Author</div>
          <div id="task-name" className="task_table_header_cols">Task</div>
          <div id="task-desc" className="task_table_header_cols">Description</div>
          <div id="task-status" className="task_table_header_cols">Status</div>
          <div id="task-due-date" className="bg-gray-200 pt-2 pb-1">Date</div>

        </div>

        <div className="task_table_row">

          <div id="" className="task_table_row_item">Eric Pineda</div>
          <div id="" className="task_table_row_item">Clean Bathroom</div>
          <div id="" className="task_table_row_item">It's due over 10 weeks...</div>
          <div id="" className="task_table_row_item">In Progress</div>
          <div id="" className="task_table_row_item">7/1/2023</div>

        </div>

      </div>

    </section>
  )
}

export default TaskList