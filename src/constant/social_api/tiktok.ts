import { server } from "./../index";
import { Posts } from "../provider";


export const fetchTiktokPost = async () : Promise<Posts[]> => {

    const response = await fetch(`${server}/tiktok/posts?type=all`, {credentials: "include"});
    const data = await response.json();
    if(data.message !== "success") return [];
    const resultFormatted : Posts[] = data.data.tiktok;

    return resultFormatted;
}
