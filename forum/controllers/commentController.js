const { Comment, Thread } = require("../models/index");

class commentController {
  static async createComment(req, res, next) {
    try {
      let { comment, ThreadId } = req.body;
      // console.log(comment);
      let threadData = await Thread.findByPk(ThreadId);

      if (!threadData) {
        throw { name: "Not Found" };
      }

      let commentData = await Comment.create({ comment, ThreadId });

      res.status(201).json(commentData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async fetchComments(req, res, next) {
    try {
      let commentData = await Comment.findAll();

      if (!commentData) {
        throw { name: "Not Found" };
      }

      res.status(200).json(commentData);
    } catch (error) {
      next(error);
    }
  }

  static async fetchCommentById(req, res, next) {
    try {
      const { id } = req.params;

      const comment = await Comment.findByPk(+id);

      if (!comment) {
        throw { name: "Not Found" };
      }
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const { id } = req.params;

      const comment = await Comment.findByPk(id);

      if (!comment) {
        throw { name: "Not Found" };
      }

      await Comment.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        msg: `Comment delete is successfull`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateComment(req, res, next) {
    try {
      const { comment, ThreadId } = req.body;

      const { id } = req.params;

      const oneComment = await Comment.findByPk(id);

      if (!oneComment) {
        throw { name: "Not Found" };
      }

      await Comment.update({ comment, ThreadId }, { where: { id } });

      res.status(200).json({
        msg: `Comment with id ${oneComment.id} has been updated successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = commentController;
