const mChat = require("../models/chat");
const { User } = require("../models");

class Chat {
  static async getChats(req, res, next) {
    console.log("first");
    try {
      let result = await mChat.find().sort({ createdAt: -1 }).exec();
      // orchestrator
      let allUser = await User.findAll({
        raw: true,
        attributes: [
          ["id", "_id"],
          ["fullName", "name"],
          ["PhaseBatchId", "PhaseBatchId"],
        ],
      });
      let chats = [];
      result.forEach((el) => {
        let dataUser = allUser.find((element) => element._id == el.sender);
        if (req.user.PhaseBatchId == dataUser.PhaseBatchId) {
          chats.push({
            _id: el._id,
            text: el.message,
            image: el.imgUrl,
            user: allUser.find((element) => element._id == el.sender),
            createdAt: el.createdAt,
          });
        }
      });
      console.log(chats);
      res.status(200).json(chats);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async sendMessage(req, res, next) {
    try {
      const { message, imgUrl } = req.body;
      const { id } = req.user;
      await new mChat({
        sender: id,
        message,
        imgUrl,
        createdAt: new Date(),
      }).save();
      res.status(201).json({
        message: "Pesan berhasil ditambah",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Chat;
