import { useEffect, useState } from "react";

const useUserId = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      storedUserId = crypto.randomUUID();

      localStorage.setItem("userId", storedUserId);
    }

    setUserId(storedUserId);
  }, []);

  return userId;
};

export default useUserId;
