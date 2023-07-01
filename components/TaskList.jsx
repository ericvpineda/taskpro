'use client'

import Link from "next/link"

const TaskList = (tasks) => {
  return (
    <section className="w-full flex justify-center mt-10">
      
      <div className="task_list_container">

        {/* Note: add resizing for smaller screen widths   */}
        <div className="task_table_header">

          <div id="task-author-img" className="task_table_header_cols">Author</div>
          <div id="task-name" className="task_table_header_cols">Task</div>
          <div id="task-desc" className="task_table_header_cols">Description</div>
          <div id="task-status" className="task_table_header_cols">Status</div>
          <div id="task-due-date" className="bg-gray-200 pt-2 pb-1">Date</div>

        </div>

        <div className="table_row"></div>

      </div>

    </section>
  )
}

export default TaskList