import { server } from ".."
import { Posts } from "../provider";

/// Fetch Instagram posts
export const fetchIgPosts = async (): Promise<Posts[]> => {
    const response = await fetch(`${server}/ig/posts?type=all`, { credentials: "include" });
    
    // Parse the response as JSON
    const data = await response.json();
    if(data.message !== "success") return [];
    const resultFormatted : Posts[] = data.data.instagram; // Directly assert as Posts[]

    //console.log("Media Response", resultFormatted);
    return resultFormatted; // Return the typed data
}