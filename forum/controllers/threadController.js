const { Thread, Comment, User } = require("../models");

class threadController {
  static async fetchThreads(req, res, next) {
    console.log("first");
    try {
      const threadData = await Thread.findAll({
        include: Comment,
        order: [["createdAt", "DESC"]],
      });

      if (!threadData) {
        throw { name: "Not Found" };
      }

      res.status(200).json(threadData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createThread(req, res, next) {
    try {
      const { title, content } = req.body;
      const { id } = req.user;
      const threadData = await Thread.create({ title, content, UserId: id });
      console.log(threadData);

      res.status(201).json(threadData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchThreadById(req, res, next) {
    try {
      const { id } = req.params;

      const thread = await Thread.findOne({
        include: [
          { model: Comment, include: User }, 
          { model: User }],
        where: { id },
      });
      if (!thread) {
        throw { name: "Not Found" };
      }

      res.status(200).json(thread);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteThread(req, res, next) {
    try {
      let { id } = req.params;

      let thread = await Thread.findByPk(id);

      if (!thread) {
        throw { name: "Not Found" };
      }

      await Thread.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        msg: `Thread delete is successfull`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateThread(req, res, next) {
    try {
      const { title, content } = req.body;
      const { id } = req.params;

      const thread = await Thread.findByPk(id);

      await Thread.update(
        {
          title,
          content,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        msg: `Thread with id ${thread.id} has been updated successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = threadController;
