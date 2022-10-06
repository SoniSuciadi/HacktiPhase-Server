const mChat = require("../models/chat");

class Chat {
  static async getChats(req, res, next) {
    try {
      let result = await mChat.find().exec();

      // orchestrator
      // let allUser = await user.findAll({ raw: true });

      // let chats = result.map((el) => {
      //   return {
      //     message: el.message,
      //     imgUrl: el.imgUrl,
      //     User: allUser.find((element) => element.id == el.sender),
      //     createdAt: el.createdAt,
      //   };
      // });

      res.status(200).json(result);
    } catch (error) {
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
