const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id", "user1ReadMessageId", "user2ReadMessageId"],
      order: [[Message, "createdAt", "ASC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        convoJSON.otherUser.readMessageId = convoJSON.user1ReadMessageId; 
        convoJSON.readMessageId = convoJSON.user2ReadMessageId;
        delete convoJSON.user1ReadMessageId;
        delete convoJSON.user2ReadMessageId;
        delete convoJSON.user1;

      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        convoJSON.otherUser.readMessageId = convoJSON.user2ReadMessageId; 
        convoJSON.readMessageId = convoJSON.user1ReadMessageId;
        delete convoJSON.user1ReadMessageId;
        delete convoJSON.user2ReadMessageId;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[convoJSON.messages.length-1].text;
      conversations[i] = convoJSON;
    }

    res.json(conversations.reverse());
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/read-status", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const readMessage = req.body;
    const convo = await Conversation.findConversationById(req.params.id);
    if(![convo.user1Id, convo.user2Id].includes(req.user.id)){
      return res.sendStatus(401);
    }
    let updateSet = (req.user.id === convo.user1Id)? { user1ReadMessageId: readMessage.id } : { user2ReadMessageId: readMessage.id};
    convo.update(updateSet);
    res.status(200).send({id : req.params.id});

  } catch (error) {
    next(error);
  }
});

router.get("/:id/read-status", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const readMessage = req.body;
    const convo = await Conversation.findConversationById(req.params.id);
    if(![convo.user1Id, convo.user2Id].includes(req.user.id)){
      return res.sendStatus(401);
    }
    const result = {};
    result[convo.user1Id] = convo.user1ReadMessageId;
    result[convo.user2Id] = convo.user2ReadMessageId;
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
