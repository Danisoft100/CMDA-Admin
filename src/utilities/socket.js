import { useState, useEffect } from "react";
import io from "socket.io-client";

const socketState = {
  connected: false,
};

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [state, setState] = useState(socketState);

  useEffect(() => {
    const URL = import.meta.env.VITE_API_BASE_URL;
    const newSocket = io(URL);

    newSocket.on("connect", () => {
      setState({ connected: true });
    });

    newSocket.on("disconnect", () => {
      setState({ connected: false });
    });

    newSocket.on("connect_error", (error) => {
      console.log("SOCKET_ERROR", error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return { socket, state };
};
