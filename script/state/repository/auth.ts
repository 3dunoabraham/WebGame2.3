import { cookies } from "next/headers"

// const api_url = process.env.NEXT_PUBLIC_API_URL
const api_url = "???"
// const api_url = "api/"

export async function login (credentials:any) {
    try {
        const reqRes = await fetch(api_url+"/auth/login",{
            method:"POST", headers:{"Content-Type":"application/json"},
            body: JSON.stringify(credentials)
        })
        return (await reqRes.json()).data
    } catch (e) {
        return null
    }
}

export const getJWT = async () => {
    const cookieStore = cookies();
    const cookieObject:any = cookieStore.get('jwt')
    return !!cookieObject ? cookieObject.value : null;
}

export async function getUser (jwt:any) {
    try {
        const reqRes = await fetch(api_url+"/auth/verify",{
            headers: {
                "Content-Type":"application/json",
                Authorization: 'Bearer ' + jwt,
            },
        })
        return (await reqRes.json()).data
    } catch (e) {
        return null
    }
}

export default {
    getJWT,
    login,
    getUser,
}