export const serverUri : string = "http://localhost";
export const serverPort : string = "3000";
export const server : string = "https://alquify-server-production.up.railway.app";//`${serverUri}:${serverPort}`;
export const appLogoUri : string = "https://cdn.dribbble.com/users/702789/avatars/normal/62dc313bebbc78f08ffd3076b6228377.png?1646754829";
export const defaultMsgDp : string = "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
export const GoogleAuthClientID : string = "64306507520-698gofe0ids53msaqromfie3oevk9kq0.apps.googleusercontent.com";
export const GoogleAuthCallbackURL : string = `${server}/auth/callback`; //"http://localhost:3000/";
export const FBAppID : string = "1670075207224447";
export const TiktokClient: string = "sbaw9il6yasloaunrk";
export const IGClient: string = "";
export const LinkedInClient: string = "773bzg2v214w9s";
export const XClient: string = "";

export const startSession = async () => {
    const res = await fetch(`${server}/start-session`, { method: "POST", credentials: "include", headers: { "Content-type": "application/json" }});
    const response = await res.json();
    console.log(response.data.isLoggedIn)
    return response.data.isLoggedIn;
}

export const isLoggedIn = async () => {

    const res = await fetch(`${server}/is-logged-in`, { method: "POST", credentials: "include", headers: { "Content-type": "application/json" }});
    const response = await res.json();
    console.log(response.data.isLoggedIn)////
    return response.data.isLoggedIn;
}


export const LogOut = async () => {

    const res = await fetch(`${server}/logout`, {
        credentials: "include"
    });
    // localStorage.removeItem("userData");
    const rep : any = await res.json();
    return rep;
}


export const FbLogin = async () => {
    window.FB.login((response: any) => {
        console.log("response: ", response);
        if(response.authResponse){
          
            window.FB.api('/me', { fields: 'name, email' }, (userInfo: any) => {
                console.log("User: ", userInfo);

                return userInfo;
            })
        }else{
            alert("Cancelled");
        }

      }, { scope: 'public_profile, email' })
}

export const googleAuthClient = (client_id : string, callback_url : string) => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${callback_url}&response_type=code&scope=openid+email+profile`;
}

export const authUserWithFb = async (fbId : string) => {
    
    const response = await fetch(`${server}/auth-fb`, {
        method: "POST",
        body: JSON.stringify({userFbID: fbId}),
        headers:{
            "Content-Type":"application/json",
        },
    })
    const res = await response.json();

    return res;
}

export const isEmailValid = (email : string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

export const isStrong = (str: string) => {

        const hasUppercase = /[A-Z]/.test(str);
        const hasLowercase = /[a-z]/.test(str);
        const hasNumber = /\d/.test(str);
        const hasSymbol = /[^A-Za-z0-9]/.test(str);
      
        return hasUppercase && hasLowercase && hasNumber && hasSymbol;
}

export const registerUser = async (formData: any) => {

    const jsonData = Object.fromEntries(formData.entries());
    //console.log(jsonData)
    
    const response = await fetch(`${server}/sign-up`, {
        method: "POST",
        body: JSON.stringify(jsonData),
        credentials: "include",
        headers: {
            "Content-type" : "application/json",
        },
    });

    const rep = await response.json();

    return rep;
}

export const authenticateUser = async (formData: any) => {
    const jsonData = Object.fromEntries(formData.entries());
    const response = await fetch(`${server}/login`, {
        method: "POST",
        body: JSON.stringify(jsonData),
        credentials: "include",
        headers: {
            "Content-type": "application/json",
        },
    });

    const res = await response.json();
    return res;
}

//// send chat wizard data
export const sendChatSetupData = async (formData: any) => {
    console.log("data: ", formData)
    const result = await fetch(`${server}/reg-chat-data`, {
        method: "POST",
        body: formData,
        credentials: 'include',
        
    })

    const res = await result.json();
}


export const getInitials = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
};

export const getColorFromName = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 60%, 60%)`; // HSL for vibrant colors
    return color;
};

