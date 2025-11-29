import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggendInUser = req.user._id;
    // console.log(loggendInUser);

    const filteredUsers = await User.find({ _id: { $ne: loggendInUser } }).select('-password');
    res.status(200).json(filteredUsers);

  } catch (error) {
    console.error(`Error in getAllContacts: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
}
export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    });
    // console.log(messages);

    res.status(200).json(messages);
  } catch (error) {
    console.error(`Error in getMessagesByUserId: ${error.message}`);
    res.status(500).json({ message: "Server error" }); 
  }
}
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });
    const savedMessage = await newMessage.save();
    //send message in real-time using socket.io
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(`Error in sendMessage: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
}
export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }]
    });
    const chatPartnerIds = messages.map((msg) => msg.senderId.toString() === loggedInUserId.toString() ?
      msg.receiverId.toString() :
      msg.senderId.toString());

    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select('-password');
    res.status(200).json(chatPartners);
  } catch (error) {
    console.error(`Error in getChatPartners: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }

}