"use client";

import Feed from "@components/Feed";
import { useState, useEffect } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/task");
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="text-center header-text">
        Organize. Prioritize. Succeed.
        <br className="max-md:hidden" />
      </h1>
      <p className="text-center description">
        TaskPro is your ultimate task companion tool to create and edit tasks on
        any device.
      </p>
      <Feed data={tasks} />
    </section>
  );
};

export default Home;
