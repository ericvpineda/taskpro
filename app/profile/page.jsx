"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileTaskList from "@components/ProfileTaskList";
import { useSearchParams } from "next/navigation";

const Profile = () => {
  // Steps:
  // 1. use effect to get current user and users tasks
  // 2. display all users tasks in scrollable task list
  // 3. remove user image/name in task list
  // 4. add ability for user to edit/delete tasks

  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const router = useRouter()
  const [sortQuery, setSortQuery] = useState("")
  const [isAuthor, setIsAuthor] = useState(false)
  // Note: cannot put this inside useEffect
  const selectedAuthor = useSearchParams().get("id")
  const [authorName, setAuthorName] = useState("")

  useEffect(() => {
    const getUserTasks = async () => {
      try {
        const currentProfileId = selectedAuthor || session?.user.id
        const response = await fetch(`/api/users/${currentProfileId}/tasks`);
        const data = await response.json();
        setTasks(data);
        setIsAuthor(currentProfileId == session?.user.id)

        // Get author name if not signed in and click showed tasks
        if (currentProfileId != session?.user.id) {
          const response = await fetch(`/api/users/${selectedAuthor}`);
          const data = await response.json();
          setAuthorName(data.username)
        } else {
          setAuthorName(session?.user.name)
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserTasks();
  }, [session, isAuthor]);

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

  const editTaskHandler = async (taskId) => {
    // Navigate to client page
    router.push(`/update-task?id=${taskId}`)
  }

  const deleteTaskHandler = async (taskId) => {

    const isConfirmed = confirm("Are you sure you want to delete this task?");

    if (isConfirmed) {
        try {
            await fetch(`/api/task/${taskId}`, {
                method: 'DELETE',
            })
            const filteredTasks = tasks.filter(taskToFilter => taskToFilter._id !== taskId);
            setTasks(filteredTasks)
        } catch (error) {
            console.log(error)
        }
    }

  }
 
  return (
    <section className="feed">
          <h1 className="self-start header-text">{isAuthor ? "My" : authorName} Tasks</h1>
          <p className="self-start description">
              <i>Always deliever more than expected. ~ Larry Page</i>
          </p>
          <ProfileTaskList 
              tasks={tasks}
              editTask={editTaskHandler}
              deleteTask={deleteTaskHandler}
              sortBy={setSortQuery}
              isAuthor={isAuthor}
          />
    </section>
  );
};

export default Profile;
