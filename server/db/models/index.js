const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations
const ConversationUsers = sequelize.define('ConversationUsers', {
  conversationId: {
    type: DataTypes.INTEGER,
    references: {
      model: Conversation, // 'Movies' would also work
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // 'Actors' would also work
      key: 'id'
    }
  }
});
Conversation.belongsToMany(User, { through: ConversationUsers });
User.belongsToMany(Conversation, { through: ConversationUsers });

Message.belongsTo(ConversationUsers);
ConversationUsers.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  ConversationUsers
};

