const channel ="https://6af348f3d2377d6c3704d1d5.mockapi.io/channels";

export const fetchchannel =async()=>{
    const reponce=await fetch(channel)
    if(!reponce.ok){
        throw new error(`error ${reponce.status}`);
    }
    return reponce.json()
}