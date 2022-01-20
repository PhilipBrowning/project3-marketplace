const { AuthenticationError } = require("apollo-server-express");
const { User, Item } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("Item");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("Item");
    },
    items: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Item.find(params);
    },
    item: async (parent, { username }) => {
      const params = username ? { username } : {};
      const currentItem = await Item.findOne(params);
      console.log(currentItem);
      return currentItem;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    logout: async (parent, args, context) => {
      context.user = undefined;
      return true;
    },
  },
};

module.exports = resolvers;
