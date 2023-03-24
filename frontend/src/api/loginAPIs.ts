
export async function facebookLogin(code:string){
    const res = await fetch(`${process.env.BACKEND_SERVER}/users/login/facebook`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        },
        body: JSON.stringify({ code })
    })
    const result = await res.json();

    return result

    // if(res.ok){
    // localStorage.setItem('token', result.token)
    //     return result
    // }else{
    //     return false
    // }
}