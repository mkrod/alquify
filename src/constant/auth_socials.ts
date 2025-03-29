import { FBAppID, GoogleAuthClientID, IGClient, LinkedInClient, server, TiktokClient } from ".";


// Fetch Facebook User Details
async function getFacebookUserDetails(token: string) {

  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/me?fields=id,name,email,picture&access_token=${token}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Failed to fetch Facebook details");
    return data;
  } catch (error) {
    console.error("Facebook API Error:", error);
    return null;
  }
}

// Fetch Twitter (X) User Details
async function getTwitterUserDetails(token: string) {
  try {
    const response = await fetch(`${server}/x-user-profile`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type":"application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Failed to fetch Twitter details");
    return data;
  } catch (error) {
    console.error("Twitter API Error:", error);
    return null;
  }
}

// Fetch Instagram User Details
async function getInstagramUserDetails(token: string) {
  try {
    const response = await fetch(`https://graph.instagram.com/me?fields=id,username,account_type,profile_picture_url&access_token=${token}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Failed to fetch Instagram details");
    return data;
  } catch (error) {
    console.error("Instagram API Error:", error);
    return null;
  }
}

// Fetch LinkedIn User Details
async function getLinkedInUserDetails(token: string) {
  console.log("Fetching the LinkedIn user details");

  try {
    const url = "https://api.linkedin.com/v2/userinfo";
    const response = await fetch(`${server}/cors-bypass`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ url, token }),
      headers: { "Content-Type": "application/json" },
      //headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Failed to fetch LinkedIn details");
    return data;
  } catch (error) {
    console.error("LinkedIn API Error:", error);
    return null;
  }
}

// Fetch Google (YouTube) User Details
async function getGoogleUserDetails(token: string) {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Failed to fetch Google details");
    return data;
  } catch (error) {
    console.error("Google API Error:", error);
    return null;
  }
}


// Fetch TikTok User Details
async function getTikTokUserDetails(token: string) {
  try {
    const response = await fetch("https://open.tiktokapis.com/v2/user/info/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Failed to fetch TikTok details");

    return data.data?.user || null;
  } catch (error) {
    console.error("TikTok API Error:", error);
    return null;
  }
}




export const authorizeFB = () => { 
  const scope  = 'public_profile,email';
  //const scope = 'pages_show_list,public_profile,pages_manage_posts,pages_read_engagement,pages_manage_metadata,pages_read_user_content,pages_manage_ads,pages_manage_engagement';
  const response_type= 'code';
  const client_id = FBAppID;
  const redirect_uri = `${server}/auth/facebook/callback`;
  const url = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}`;

  window.location.href = url;
};

export const authorizeInstagram = () => { 
  const scope = 'user_profile,user_media'; 
  const response_type = 'code';
  const client_id = IGClient;
  const redirect_uri = `${server}/auth/instagram/callback`;
  const url = `https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}`;

  window.location.href = url;
};


export const authorizeTikTok = () => { 
  alert("Tiktok imppp");

  const scope = 'user.info.basic,user.info.profile,video.upload'; 
  const response_type = 'code';
  const client_key = TiktokClient;  
  const redirect_uri = encodeURIComponent(`${server}/auth/tiktok/callback`); 
  const state = encodeURIComponent("random_string_to_prevent_csrf"); 

  const url = `https://www.tiktok.com/auth/authorize/?client_key=${client_key}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}&state=${state}`;

  window.location.href = url;
};


export const authorizeLinkedIn = () => { 
  //alert("LinkedIn authorization is not yet implemented.");
  const scope = 'openid email profile r_events w_member_social rw_events';
  const response_type = 'code';
  const client_id = LinkedInClient;
  const redirect_uri = `${server}/auth/linkedin/callback`;
  const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=${response_type}&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=foobar&scope=${encodeURIComponent(scope)}`
  //const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=${response_type}&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=`;

  window.location.href = url;
};



export const authorizeGoogle = () => { 
  const scope = 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email';
  const response_type = 'code';
  const client_id = GoogleAuthClientID
  const redirect_uri = `${server}/auth/google/callback`;
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(scope)}&response_type=${response_type}&access_type=offline`;

  window.location.href = url;
};


export const authorizeTwitter = () => { 
/*  const scope = 'tweet.read users.read offline.access';
  const response_type = 'code';
  const client_id = XClient;
  const redirect_uri = `${server}/auth/twitter/callback`;
  const url = `https://twitter.com/i/oauth2/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(scope)}&code_challenge=challenge&code_challenge_method=plain`;

  window.location.href = url;*/

  const url = `${server}/twitter-auth?Wd=${Date.now()}&rsd=${Number(Date.now())  + Number(Date.now())}`;
  window.location.href = url;
};



//assuming the getFacebookUserDetails function is defined in the same file and returns the user details
//did i appropriately overwrite the user details in the local storage?

export const setUserDetails = async (data: any) => {
  const { fb_token, x_token, tiktok_token, ig_token, linkedin_token, google_token } = data;
  console.log("Updating user details...:", data);

  try {
    // Get existing user data from localStorage
    const existingUserData = JSON.parse(localStorage.getItem("userSocialData") || "{}");
    console.log("Start: ", existingUserData)
    // Function to handle token expiration
    const handleTokenError = (platform: string, tokenKey: string) => {
      console.warn(`${platform} token expired or invalid. Removing from localStorage.`);
      delete existingUserData[platform]; // Remove expired user details
      localStorage.removeItem(tokenKey); // Remove the expired token
    };

    // Fetch and update Facebook data
    if (fb_token && !existingUserData.facebook) {
      const fbData = await getFacebookUserDetails(fb_token);
      if (fbData?.error) handleTokenError("facebook", "fb_token");
      else if (fbData) {
        existingUserData.facebook = {
          name: fbData.name,
          email: fbData.email,
          picture: fbData.picture?.data?.url,
          id: fbData.id,
        };
      }
    }

    // Fetch and update Twitter (X) data
    if (x_token && !existingUserData.x) {
      const xData = await getTwitterUserDetails(x_token);
      if (xData?.error) handleTokenError("x", "x_token");
      else if (xData) {
        console.log("XDAta: ", xData.data);
        existingUserData.x = {
          name: xData.data.name,
          username: xData.data.username,
          picture: xData.data.profile_image_url,
          id: xData.data.id,
        };
      }
    }

    // Fetch and update Instagram data
    if (ig_token && !existingUserData.instagram) {
      const igData = await getInstagramUserDetails(ig_token);
      if (igData?.error) handleTokenError("instagram", "ig_token");
      else if (igData) {
        existingUserData.instagram = {
          username: igData.username,
          profile_picture: igData.profile_picture_url,
          id: igData.id,
        };
      }
    }

    // Fetch and update LinkedIn data
    if (linkedin_token && !existingUserData.linkedin) {
      const linkedInData = await getLinkedInUserDetails(linkedin_token);
      if (linkedInData?.error) handleTokenError("linkedin", "linkedin_token");
      else if (linkedInData) {
        existingUserData.linkedin = {
          name: linkedInData.given_name + " " + linkedInData.family_name,
          id: linkedInData.id,
          picture: linkedInData.picture,
        };
      }
    }

    // Fetch and update Google (YouTube) data
    if (google_token && !existingUserData.google) {
      const googleData = await getGoogleUserDetails(google_token);
      if (googleData?.error) handleTokenError("google", "google_token");
      else if (googleData) {
        existingUserData.google = {
          name: googleData.name,
          email: googleData.email,
          picture: googleData.picture,
          id: googleData.sub,
        };
      }
    }

    // Fetch and update TikTok data
    if (tiktok_token && !existingUserData.tiktok) {
      const tiktokData = await getTikTokUserDetails(tiktok_token);
      if (tiktokData?.error) handleTokenError("tiktok", "tiktok_token");
      else if (tiktokData) {
        existingUserData.tiktok = {
          username: tiktokData.username,
          id: tiktokData.open_id,
          profile_picture: tiktokData.avatar_url,
        };
      }
    }

    console.log("End: ", existingUserData)
    // Save updated data to localStorage
    localStorage.setItem("userSocialData", JSON.stringify(existingUserData));
    return existingUserData;

  } catch (error) {
    console.error("Error updating user details:", error);
  }
};


/*
npm install twitter-api-v2
2. Initialize the Twitter Client
Create a file (e.g., twitterClient.js) and set up authentication:

javascript
Copy
Edit
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: 'YOUR_API_KEY',
  appSecret: 'YOUR_API_SECRET',
  accessToken: 'USER_ACCESS_TOKEN',
  accessSecret: 'USER_ACCESS_SECRET',
});

module.exports = client;
3. Fetch User Tweets
Create a function to get a user's tweets:

javascript
Copy
Edit
async function fetchUserTweets(userId) {
  try {
    const tweets = await client.v2.userTimeline(userId, { max_results: 5 });
    console.log(tweets.data);
    return tweets;
  } catch (error) {
    console.error('Error fetching tweets:', error);
  }
}

// Replace 'USER_ID' with the actual user ID
fetchUserTweets('USER_ID');
4. Post a Tweet on Behalf of a User
javascript
Copy
Edit
async function postTweet(text) {
  try {
    const tweet = await client.v2.tweet(text);
    console.log('Tweet posted:', tweet);
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

// Example Usage
postTweet('Hello from my API integration!');
What’s Next?
If you don’t have the USER_ID, you can get it using the /2/users/by/username/:username endpoint.

If you want users to log in and authorize your app dynamically, you'll need to implement OAuth flow.

Do you want to set up user authentication, or is this good for now?
*/