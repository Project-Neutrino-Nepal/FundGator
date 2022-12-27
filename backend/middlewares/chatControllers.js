// const accessChat = require ("express-async-handler");
// const Chat = require("../models/chatModel");


// const accessChat = asyncHandler(async(req, res)=>{
//     const {userId} = req.body;

//     if (!userId){
//         return res.sendStatus(400);
//     }

//     var isChat = await Chat.find({
//         $and:[
//             {users: {$eleMatch:{$eq:req.user._id}}},
//             {users: {$eleMatch:{$eq:userId}}},
//         ],
//     }).populate("users","-password")
//     .populate("latestMessage");

//     isChat = await User.populate(isChat,
//         {path:"latestMessage.sender", select:"name"});

//     if (isChat.length > 0){
//         return res.send(isChat[0]);
//     }else{
//         const newChat = await Chat.create({
//             users:[req.user._id, userId],
//         });
//         return res.send(newChat);

//     }
//     try{}


//     catch(err){


    
    
