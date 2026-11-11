import { fetchchannel } from "./api.js";

const init = async()=>{
    try{
        const channel=await fetchchannel();
        console.log(channel)
    }
    catch(error){
          console.error(error.message)
    }
}    
init()