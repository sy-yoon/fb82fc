const { Op, Sequelize } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  user1ReadMessageId: {
    type: Sequelize.INTEGER
  },
  user2ReadMessageId: {
    type: Sequelize.INTEGER
  },
});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.findConversationById = async function (id) {
  const conversation = await Conversation.findOne({
    where: {
      id: id
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
