import { Posts } from "../provider";

// Normalizing timestamp function
const normalizeTimestamp = (timestamp: any) => {
    if (!timestamp) return null;

    // If timestamp is a Unix timestamp in seconds, convert it to milliseconds
    if (typeof timestamp === "number" && timestamp.toString().length <= 10) {
        return new Date(timestamp * 1000).toISOString();
    }
    
    // If it's already an ISO string, return it
    if (typeof timestamp === "string" && !isNaN(Date.parse(timestamp))) {
        return timestamp;
    }
    
    return null; // Return null if timestamp is invalid
};

export const sortPostsByTimestamp = (posts: Posts[]): Posts[] => {
    return posts
        .map(post => ({
            ...post,
            timestamp: normalizeTimestamp(post.timestamp), // Normalize the timestamp first
        }))
        .filter(post => post.timestamp !== null) // Remove posts with invalid timestamps
        .sort((a, b) => {
            const dateA = new Date(a.timestamp || 0).getTime();
            const dateB = new Date(b.timestamp || 0).getTime();
            return dateB - dateA; // Sort in descending order
        });
};