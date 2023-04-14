const api_url = "api/"

async function login (credentials:any) {
    try {
        const reqRes = await fetch(api_url+"/auth/login",{
            method:"POST", headers:{"Content-Type":"application/json"},
            body: JSON.stringify(credentials),
        })
        return await reqRes.json()
    } catch (e) {
        return null
    }
}
async function demo () {
    try {
        const reqRes = await fetch(api_url+"/auth/demo",{
            method:"POST", headers:{"Content-Type":"application/json"},
            body: JSON.stringify({}),
        })
        return await reqRes.json()
    } catch (e) {
        return null
    }
}
export default {
    login,
    demo,
}