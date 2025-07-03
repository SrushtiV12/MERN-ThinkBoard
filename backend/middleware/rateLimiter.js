import ratelimit from "../config/upstash.js"

const rateLimiter = async (req,res,next) => {
     try{
        const {success} = await ratelimit.limit("my-rate-limit")    // it should be according to a specific user by userid

        if(!success){
            return res.status(429).json({
                message:"Too many requests, please try again later"
            })
        }
        next();
     } catch (error){
        console.log("Rate limit error", error)
        next(error);
     }


    
}

export default rateLimiter