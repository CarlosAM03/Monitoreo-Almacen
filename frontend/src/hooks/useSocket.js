import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

export default function useSocket() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = io(API_URL);

    socket.on("connect", () => {
      console.log("Conectado al backend");
    });

    socket.on("sensor:data", (incoming) => {
      setData(incoming);
    });

    return () => socket.disconnect();
  }, []);

  return data;
}