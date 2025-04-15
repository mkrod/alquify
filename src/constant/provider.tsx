import React, { createContext, useContext, useEffect, useRef, useState } from "react";
//import { server } from ".";
import { fetchIgPosts } from "./social_api/instagram";
import { fetchLinkedInPost } from "./social_api/linkedin";
import { fetchTiktokPost } from "./social_api/tiktok";
export interface Posts {
    id?: string | null;
    title?: string | null;
    description?: string | null;
    media_type?: string | null;
    media_url?: string | null;
    thumbnail_url?: string | null;
    timestamp?: string | null;
    permalink?: string | null;
    tags?: string[];
    platform?: string;
  
    username?: string | null;
    comments_count?: number | null;
    like_count?: number | null;
    shares_count?: number | null;
    view_count?: number | null;
    retweet_count?: number | null;
    favorite_count?: number | null;
    reply_count?: number | null;
    verified?: boolean | null;
    profile_image_url?: string | null;
    music?: {
      title?: string | null;
      author?: string | null;
      url?: string | null;
    } | null;
    comments?: any[] | null;
    media_children?: PostChild[] | null; 
}
export interface PostChild {
    id?: string;
    media_type?: string | null;
    media_url?: string | null;
    thumbnail_url?: string | null;
}
// WebSocket Context Type
interface WebSocketContextType {
    socket: WebSocket | null;
    latestMessage: string | null;
    sendMessage: (message: any) => void;
    refreshing: boolean;
    setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
    userData: Record<string, any>;
    setUserData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    online: Record<string, boolean>;
    ReConnecting: boolean;
    note: string;
    setNote: React.Dispatch<React.SetStateAction<string>>;
    socialAccounts: Record<string, any>;
    setSocialAccounts: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    socialPosts: Record<string, Posts[]>;
    setSocialPost: React.Dispatch<React.SetStateAction<Record<string, any>>>;
    fetchingPosts: boolean;
    setFetchingPost: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [userData, setUserData] = useState<Record<string, any>>({});
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
            setUserData(userData);

            if (!userData) {
                console.log("No user data found, retrying in 3 seconds...");
                setTimeout(connectWebSocket, 3000); // Retry after 3 seconds
                return;
            }

            console.log("Connecting to WebSocket...");
            /* // production
            const wsUrl = new URL(server);
            const socketInstance = new WebSocket(`${wsUrl.protocol.replace('http', 'ws')}//${wsUrl.hostname}`);*/
            //console.log(socketInstance);
            //const wsURl = new URL(server);

            const socketInstance = new WebSocket(`ws://${"localhost:3000"}`);// Replace with your WebSocket server URL
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

    /// social media fetch attempt//
    ////////////////////////////////
    ////////////////////////////////
    ////////////////////////////////
 
    // using the interface Posts[] because the response will always come in this format from the backend, i formatted all response to this...
    const [socialPosts, setSocialPost] = useState<Record<string, Posts[]>>({});
    const [fetchingPosts, setFetchingPost] = useState<boolean>(false);
    useEffect(() => {


        const getAllMedia = async () => {
            setFetchingPost(true);
            const ig_posts = await fetchIgPosts() || []; //return object of posts inside array, Ensure it defaults to an empty array if undefined
            const linkedin_posts = await fetchLinkedInPost() || []; //return object of posts inside array
            const tiktok_posts = await fetchTiktokPost() || [];



            const AllPosts : Record<string, Posts[]> = {
                instagram: ig_posts,
                linkedin: linkedin_posts,
                tiktok: tiktok_posts,
            }

            setSocialPost(AllPosts);
        }

        getAllMedia()
        .then(() => { })
        .catch(() => {
            setNote("Cannot Fetch Posts, Try again Later");
            setTimeout(() => setNote(""),3000)
        })
        .finally(() => setFetchingPost(false))
    }, [socialAccounts])


    //////////////////////////////////
    //////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////

    //console.log("User online: ", online);
    return (
        <WebSocketContext.Provider value={{ refreshing, setRefreshing, socket, sendMessage, latestMessage, userData, setUserData, online, ReConnecting, note, setNote, socialAccounts, setSocialAccounts, socialPosts, setSocialPost, fetchingPosts, setFetchingPost }}>
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
