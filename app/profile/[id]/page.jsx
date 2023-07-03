"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import ProfileTaskList from "@components/ProfileTaskList";
import Image from "next/image";

const Profile = ({params}) => {
  // Steps:
  // 1. use effect to get current user and users tasks
  // 2. display all users tasks in scrollable task list
  // 3. remove user image/name in task list
  // 4. add ability for user to edit/delete tasks

  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const [sortQuery, setSortQuery] = useState("");
  const [isAuthor, setIsAuthor] = useState(true);
  // Note: cannot put this inside useEffect
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const getUserTasks = async () => {
      try {
        const selectedAuthor = params.id;
        // Get author name if not signed in and click showed tasks
        if (selectedAuthor != session?.user.id) {
          const response = await fetch(`/api/users/${selectedAuthor}`);
          const data = await response.json();
          setAuthor(data);
        } else {
          setAuthor(session?.user);
        }

        const response = await fetch(`/api/users/${selectedAuthor}/tasks`);
        const data = await response.json();
        setTasks(data);
        setIsAuthor(selectedAuthor == session?.user.id);

      } catch (error) {
        console.log(error);
      }
    };

    getUserTasks();
  }, [session, isAuthor]);

  useEffect(() => {
    let sortedTasks = [];
    if (sortQuery == "author") {
      // Note: sort() mutates array and returns array, need to copy and assign to new array
      sortedTasks = [...tasks].sort((a, b) =>
        a.author.username.toLowerCase() < b.author.username.toLowerCase()
          ? -1
          : 1
      );
    } else if (sortQuery == "name") {
      sortedTasks = [...tasks].sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
      );
    } else if (sortQuery == "desc") {
      sortedTasks = [...tasks].sort((a, b) =>
        a.desc.toLowerCase() < b.desc.toLowerCase() ? -1 : 1
      );
    } else if (sortQuery == "status") {
      sortedTasks = [...tasks].sort((a, b) =>
        a.status.toLowerCase() < b.status.toLowerCase() ? -1 : 1
      );
    } else if (sortQuery == "date") {
      sortedTasks = [...tasks].sort((a, b) =>
        a.date.toLowerCase() < b.date.toLowerCase() ? -1 : 1
      );
    }

    if (sortQuery != "") {
      setTasks(sortedTasks);
    }

    setSortQuery("");
  }, [sortQuery, tasks]);

  const editTaskHandler = async (taskId) => {
    // Navigate to client page
    router.push(`/update-task?id=${taskId}`);
  };

  const deleteTaskHandler = async (taskId) => {
    const isConfirmed = confirm("Are you sure you want to delete this task?");

    if (isConfirmed) {
      try {
        await fetch(`/api/task/${taskId}`, { method: "DELETE" });
        const filteredTasks = tasks.filter(taskToFilter => taskToFilter._id !== taskId)
        setTasks(filteredTasks);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="feed">
      <h1 className="header-text items-center">
        {isAuthor ? (
          "My Tasks"
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Image
              src={author.image || "/"}
              height={120}
              width={120}
              className="rounded-full mb-5"
              alt="author_image"
            />
            <div className="ml-5">{author.username} Tasks</div>
          </div>
        )}
      </h1>
      <p className="text-center description">
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
