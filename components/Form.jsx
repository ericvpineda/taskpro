import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ type, task, setTask, setIsSubmit, isSubmit, formSubmit }) => {
  return (
    <section className="w-full flex items-start flex-col">
      <h1 className="text-center header-text">{type} Task</h1>

      <p className="desc">
        As a simple outline, make tasks that are specific, measurable,
        achievable, relevant, and time-bound.
        <br />
        <br />
        ...aka SMART goals.
      </p>

      <form
        action=""
        onSubmit={formSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassy"
      >
        <label htmlFor="name">
          <span className="font-roboto font-semibold text-base text-gray-700 pl-3">
            Define the Task
          </span>

          <input
            type="text"
            name="name"
            id="name"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            className="form_input"
            placeholder="Name"
          />

        </label>

        <label htmlFor="desc">
          <textarea 
          name="desc" 
          id="desc" 
          cols="30" 
          rows="3"
          placeholder="Describe the task"
          className="textarea_input"
          ></textarea>
        </label>

        <div className="flex flex-row justify-between">
            
            <label htmlFor="status">
                <select className="form_input" name="progrss" id="progress">
                <option value="default" selected>
                Select Status
                </option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            </label>
            <label htmlFor="date">
                <DatePicker
                selected={task.date}
                className="form_input text-center hover:cursor-pointer"
                onChange={(date) => setTask({...task, date: date})}
            />
            </label>
        </div>
      </form>
    </section>
  );
};

export default Form;
