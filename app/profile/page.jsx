"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileTaskList from "@components/ProfileTaskList";

const Profile = () => {
  // Steps:
  // 1. use effect to get current user and users tasks
  // 2. display all users tasks in scrollable task list
  // 3. remove user image/name in task list
  // 4. add ability for user to edit/delete tasks

  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const getUserTasks = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/users/${session?.user.id}/tasks`);
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getUserTasks();
  }, [session]);

  const editTaskHandler = async (taskId) => {
    // Navigate to client page
    router.push(`/update-task?id=${taskId}`)
  }

  const deleteTaskHandler = () => {}
 
  return (
    <section className="flex justify-center items-center mx-auto w-full max-w-3xl">
        <div className="flex-col">
            <h1 className="text-left header-text">{session ? session?.user.name : "My"} Tasks</h1>
            <p className="text-left description">
                <i>Always deliever more than expected. ~ Larry Page</i>
            </p>
            <ProfileTaskList 
                tasks={tasks}
                editTask={editTaskHandler}
                deleteTask={deleteTaskHandler}
            />
        </div>
    </section>
  );
};

export default Profile;
