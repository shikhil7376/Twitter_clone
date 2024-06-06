import User from "../models/user.model.js"
import Post from "../models/post.model.js";
import cloudinary from 'cloudinary'

export const createPost = async(req,res)=>{
    try {
        console.log("here>>>");
        const {text} = req.body
        let {img} = req.body
        const userId = req.user._id.toString()
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({message:"User not found"})
        if(!text && !img){
            return res.status(404).json({message:"post must contain text and image"})
        }
        if(img){
            const uploadedResponse = await cloudinary.uploader.upload(img)
            img = uploadedResponse.secure_url
        }
        const newPost = new Post({
            user:userId,
            text,
            img
        })
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
       res.status(500).json({error:"internal server error"})
       console.log("error in createpost:",error);
    }
}

export const deletePost = async(req,res)=>{
    try {
       const post = await Post.findById(req.params.id)
       if(!post){
        return res.status(404).json({error:"Post not found"})
       }
       if(post.user.toString() !==req.user._id.toString()){
        return res.status(401).json({error:"you are not authorised to delete this post"})
       } 
       if(post.img){
          const imgId = post.img.split("/").pop().split(".")[0]
          await cloudinary.uploader.destroy(imgId)
       }
       await Post.findByIdAndDelete(req.params.id)
    } catch (error) {
        console.log("error in delete post",error);
        res.status(500).json({error:"internal server error"})
    }
}