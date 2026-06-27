"use client";

import { useEffect, useState } from "react";
import { socket } from "../libs/socket";

export default function useSocket() {
  const [connected, setConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setConnected(true);
    }

    function onDisconnect() {
      setConnected(false);
      setActiveUsers(0);
    }

    function onActiveUsers(count: number) {
      setActiveUsers(count);
    }

    socket.on("connect", onConnect);

    socket.on("disconnect", onDisconnect);

    socket.on("active-users", onActiveUsers);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("active-users", onActiveUsers);

      socket.disconnect();
    };
  }, []);

  return {
    socket,
    connected,
    activeUsers,
  };
}