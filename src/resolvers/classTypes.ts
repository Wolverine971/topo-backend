import { IResolvers } from "graphql-tools";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ClassType = mongoose.model(
  "ClassType",
  new Schema({
    id: String,
    name: String,
    properties: {
      type: Map,
      of: String,
    },
    synonyms: [String],
    dateCreated: Date,
    dateModified: Date,
  })
);

export const ClassTypeResolvers: IResolvers = {
  Date: String,

  Query: {
    getClassTypes: async () => {
      const classTypes = await ClassType.find({})
        .limit(10)
        .sort({ dateCreated: -1 })
        .exec();
      const count = await ClassType.countDocuments({});
      return {
        classTypes,
        count,
      };
    },

    deleteAllClassTypes: async () => {
      await ClassType.deleteMany({});
      return true;
    },
  },

  //   ClassType: {
  //     properties: async (root) => {
  //       if (root.commentIds && root.commentIds.length) {
  //         const comments = await Comment.find({ id: root.commentIds })
  //           .limit(10)
  //           .sort({ dateCreated: -1 });
  //         const count = await Comment.countDocuments({ id: root.commentIds });
  //         return {
  //           comments,
  //           count,
  //         };
  //       } else {
  //         return {
  //           comments: [],
  //           count: 0,
  //         };
  //       }
  //     },
  //     likes: async (root) => {
  //       return root.likeIds;
  //     },
  //     author: async (root) => {
  //       if (root.userId) {
  //         return await User.findOne({ id: root.userId });
  //       } else {
  //         return null;
  //       }
  //     },
  //   },

  Mutation: {
    createClassType: async (_, { name, properties, synonyms }) => {
      let ct: any = new ClassType({
        name,
        properties: {},
        synonyms,
        dateCreated: new Date(),
        dateModified: new Date(),
      });
      properties.forEach((p) => {
        ct.properties.set(createPropertyName(p.name), p.type);
      });
      ct.id = ct._id;
      await ct.save();
      return ct;
    },

    updateClassType: async (_, { id, name, properties, synonyms }) => {
      let ct: any = await ClassType.findOneAndUpdate(
        {
          id,
        },
        {
          name,
          properties: {},
          synonyms,
          dateModified: new Date(),
        }
      );
      properties.forEach((p) => {
        ct.properties.set(createPropertyName(p.name), p.type);
      });
      await ct.save();
      return ct;
    },
    deleteAllClassTypeById: async (_, { id }) => {
      const res = await ClassType.deleteOne({ id });
      return true;
    },
  },
};

import { gql } from "apollo-server-express";

export const ClassTypes = gql`
  extend type Query {
    getClassTypes: PaginatedClassTypes
    deleteAllClassTypes: Boolean
  }

  type PaginatedClassTypes {
    classTypes: [ClassType]
    count: Int
  }

  type ClassType {
    id: String!
    name: String
    properties: Map
    synonyms: [String]
    dateCreated: Date!
    dateModified: Date!
  }

  extend type Mutation {
    createClassType(
      name: String
      properties: Map
      synonyms: [String]
    ): ClassType!

    updateClassType(
      id: String
      name: String
      properties: Map
      synonyms: [String]
    ): ClassType!

    deleteAllClassTypeById(id: String): Boolean
  }
`;

const createPropertyName = (property: string) => {
  return property.toLowerCase().replace(" ", "-");
};
