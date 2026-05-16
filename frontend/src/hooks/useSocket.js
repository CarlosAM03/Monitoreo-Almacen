import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL;

// =====================================================
// ESTADOS OFICIALES
// =====================================================

export const SOCKET_STATUS = {

  CONNECTED: "CONNECTED",

  DISCONNECTED: "DISCONNECTED",

  RECONNECTING: "RECONNECTING"
};

// =====================================================
// CONFIG
// =====================================================

const SOCKET_TIMEOUT = 5000;

export default function useSocket() {

  const [data, setData] = useState(null);

  const [connectionStatus, setConnectionStatus] =
    useState(SOCKET_STATUS.DISCONNECTED);

  const socketRef = useRef(null);

  const timeoutRef = useRef(null);

  // =====================================================
  // RESET TIMEOUT TELEMETRÍA
  // =====================================================

  const resetTelemetryTimeout = () => {

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {

      setConnectionStatus(
        SOCKET_STATUS.DISCONNECTED
      );

    }, SOCKET_TIMEOUT);
  };

  // =====================================================
  // SOCKET INIT
  // =====================================================

  useEffect(() => {

    const socket = io(API_URL, {

      transports: ["websocket"],

      reconnection: true,

      reconnectionAttempts: Infinity,

      reconnectionDelay: 1000,

      reconnectionDelayMax: 5000,

      timeout: 5000
    });

    socketRef.current = socket;

    // =================================================
    // CONNECT
    // =================================================

    socket.on("connect", () => {

      console.log("[SOCKET] CONNECTED");

      setConnectionStatus(
        SOCKET_STATUS.CONNECTED
      );

      resetTelemetryTimeout();
    });

    // =================================================
    // SENSOR DATA
    // =================================================

    socket.on("sensor:data", (incoming) => {

      setData(incoming);

      setConnectionStatus(
        SOCKET_STATUS.CONNECTED
      );

      resetTelemetryTimeout();
    });

    // =================================================
    // RECONNECTING
    // =================================================

    socket.io.on("reconnect_attempt", () => {

      console.log("[SOCKET] RECONNECTING");

      setConnectionStatus(
        SOCKET_STATUS.RECONNECTING
      );
    });

    // =================================================
    // DISCONNECT
    // =================================================

    socket.on("disconnect", () => {

      console.log("[SOCKET] DISCONNECTED");

      setConnectionStatus(
        SOCKET_STATUS.DISCONNECTED
      );
    });

    // =================================================
    // CONNECT ERROR
    // =================================================

    socket.on("connect_error", (err) => {

      console.error(
        "[SOCKET] ERROR:",
        err.message
      );

      setConnectionStatus(
        SOCKET_STATUS.RECONNECTING
      );
    });

    // =================================================
    // CLEANUP
    // =================================================

    return () => {

      clearTimeout(timeoutRef.current);

      socket.disconnect();
    };

  }, []);

  // =====================================================
  // API HOOK
  // =====================================================

  return {

    data,

    connectionStatus
  };
}