import Cookies from "js-cookie";

// 设置Cookie
export function setCookie(info){
    const arr = Object.entries(info);
    for(let i=0; i<arr.length; i++){
        Cookies.set(arr[i][0], arr[i][1]);
    }
    return true;
}

// 获得Cookie
export function getUserCookie(){
    return {
        username: Cookies.get("username"),
        appkey: Cookies.get("appkey"),
        role: Cookies.get("role"),
        email: Cookies.get("email"),
    }
}

// 删除Cookie
export function removeCookie(){
    Cookies.remove('username');
    Cookies.remove('appkey');
    Cookies.remove('role');
    Cookies.remove('email');
    return true;
}