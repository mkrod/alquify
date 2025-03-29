import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { serverPort, serverUri } from ".";

// WebSocket Context Type
interface WebSocketContextType {
    socket: WebSocket | null;
    latestMessage: string | null;
    sendMessage: (message: any) => void;
    refreshing: boolean;
    setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
    online: Record<string, boolean>;
    ReConnecting: boolean;
    note: string;
    setNote: React.Dispatch<React.SetStateAction<string>>;
    socialAccounts: Record<string, any>;
    setSocialAccounts: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

// Create WebSocket Context
const WebSocketContext = createContext<WebSocketContextType | null>(null);

// WebSocket Provider
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    type OnlineStatus = Record<string, boolean>;

    const socketRef = useRef<WebSocket | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [latestMessage, setLatestMessage] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(true)
    const [online, setOnline] = useState<OnlineStatus>({});
    const [ReConnecting, setReconnecting] = useState<boolean>(false);
    const [note, setNote] = useState<string>("");
    const [socialAccounts, setSocialAccounts] = useState<Record<string, any>>({}); // Social accounts data



    useEffect(() => {
        const getUserData = () => {
            const data = localStorage.getItem("userData");
            return data ? JSON.parse(data) : null;
        };

        const connectWebSocket = () => {
            const userData = getUserData();

            if (!userData) {
                console.log("No user data found, retrying in 3 seconds...");
                setTimeout(connectWebSocket, 3000); // Retry after 3 seconds
                return;
            }

            console.log("Connecting to WebSocket...");
            const wsUrl = new URL(serverUri);
            const socketInstance = new WebSocket(`ws://${wsUrl.hostname}:${serverPort}`);

            socketRef.current = socketInstance;
            setSocket(socketInstance);

            socketInstance.onopen = () => {
                socketInstance.send(JSON.stringify({ type: "register", userId: userData.user_id }));
                console.log("WebSocket connected");
                setReconnecting(false);
            };

            socketInstance.onmessage = (event: MessageEvent) => {
                console.log("Received:", JSON.parse(event.data));
                setLatestMessage(event.data);
                setRefreshing(true);
                
                if(JSON.parse(event.data).type === "user-online"){
                    const userId  = JSON.parse(event.data).userId;
                    setOnline((prev) => {
                        return { ...prev, [userId]: true };
                    });                    
                }


                if(JSON.parse(event.data).type === "existing-clients"){
                    const clients = JSON.parse(event.data).clients;
                    setOnline(clients);
                }

                if(JSON.parse(event.data).type === "user-offline"){
                    const clients = JSON.parse(event.data).clients;
                    setOnline(clients);
                }
            };


            socketInstance.onerror = (error: Event) => {
                console.error("WebSocket error:", error);
            };

            socketInstance.onclose = (event: CloseEvent) => {
                console.warn("WebSocket closed:", event.reason);
                if (!event.wasClean) {
                    console.log("Attempting to reconnect...");
                    setReconnecting(true);
                    setTimeout(connectWebSocket, 5000); // Retry after 5 seconds
                }
            };
        };

        connectWebSocket();

        return () => {
            socketRef.current?.close();
        };
    }, []);

    // Function to send messages from any component
    const sendMessage = (message: any) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        } else {
            console.log("WebSocket not open");
        }
    };

    console.log("User online: ", online);
    return (
        <WebSocketContext.Provider value={{ refreshing, setRefreshing, socket, sendMessage, latestMessage, online, ReConnecting, note, setNote, socialAccounts, setSocialAccounts }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Hook to use WebSocket in any component
export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within WebSocketProvider");
    }
    return context;
};
