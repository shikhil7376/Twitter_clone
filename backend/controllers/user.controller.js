import User from "../models/user.model.js"
import Notification from "../models/notification.model.js"
import bcrypt from 'bcryptjs'
import cloudinary from 'cloudinary'

export const getUserProfile = async(req,res)=>{
    const {username} = req.params
    try {
         const user = await User.findOne({username}).select("-password")
         if(!user){
            return res.status(404).json({message:"User not found"})
         }
         res.status(200).json(user)
    } catch (error) {
        console.log("error in getUserprofile",error.message);
         res.status(500).json({error:error.message})
    }
}

export const followUnfollowUser = async(req,res)=>{
    
    try {
        const {id} = req.params
        console.log("paramsid",id);
        const userToModify = await User.findById(id)
        const currentUser = await User.findById(req.user._id)
        if(id===req.user._id.toString()){
            return res.status(400).json({error:"you can't follow/unfollow yourself"})
        }
        if(!userToModify || !currentUser) return res.status(400).json({error:"User not found"})

         const isFollowing = currentUser.following.includes(id)   
          
         if(isFollowing){
            // unfollow the user
            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}})
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id }})
            res.status(200).json({message:"User unfollowed succesfully"})
         }else{
            // follow the user
            await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
            await User.findByIdAndUpdate(req.user._id,{$push:{following:id}})
            // send notification to user
            const newNotification = new Notification({
                type:'follow',
                from:req.user._id,
                to:userToModify._id
            })
            await newNotification.save()
            res.status(200).json({message:"User followed succesfully"})
         }
    } catch (error) {
        console.log("error in getUserprofile",error.message);
        res.status(500).json({error:error.message})
    }
}

export const getSuggestedUsers = async(req,res)=>{
    try {
        const userId = req.user._id
        const usersFollowedByMe = await User.findById(userId).select("following")
        const users = await User.aggregate([
             {$match:{_id:{$ne:userId}}},
             {$sample:{size:10}}
        ])
        const filteredUsers = users.filter(user=>!usersFollowedByMe.following.includes(user.id))
        const suggestedUsers = filteredUsers.slice(0,4)
        suggestedUsers.forEach(user=>user.password = null)
        res.status(200).json(suggestedUsers)
    } catch (error) {
        console.log("error in suggestedUser",error.message);
        res.status(500).json({error:error.message})
    }
}

export const updateUser = async(req,res)=>{
    const {fullName,email,username,currentPassword,newPassword,bio,link} = req.body
    let {profileImg,coverImg} = req.body
    const userId = req.user._id
    try {
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({message:"User not found"})
        if((!newPassword && currentPassword)||(newPassword && !currentPassword)){
            return res.status(400).json({error:"please provide both current password and new password"})
        }
        if(currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword,newPassword)
            if(!isMatch) return res.status(400).json({error:"current password is incorrect"})
            if(newPassword.length<6) return res.status(400).json({error:"password must be atleast 6 character long"})
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword,salt)
            user.password = hashedPassword
        }
     if(profileImg){
         const uploadedResponse = await cloudinary.uploader.upload(profileImg)
         profileImg = uploadedResponse.secure_url
     }
     if(coverImg){
         const uploadedResponse = await cloudinary.uploader.upload(coverImg)
         coverImg = uploadedResponse.secure_url
     }

    } catch (error) {
        
    }
}