const mChat = require("../models/chat");
const { user } = require("../models");

class Chat {
  static async getChats(req, res, next) {
    try {
      let result = await mChat.find().exec();
      let allUser = await user.findAll({
        raw: true,
        attributes: ["id", ["fullName", "name"]],
      });

      let chats = result.map((el) => {
        return {
          text: el.message,
          image: el.imgUrl,
          user: allUser.find((element) => element.id == el.sender),
          createdAt: el.createdAt,
        };
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
