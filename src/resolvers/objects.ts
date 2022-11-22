import { IResolvers } from "graphql-tools";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

import { ClassType } from "./classTypes";

export const Data_Object = mongoose.model(
  "Data_Object",
  new Schema({
    id: String,
    name: String,
    properties: {
      type: Map,
      of: String,
    },
    groups: {
      type: Map,
      of: [String],
    },
    dateCreated: Date,
    dateModified: Date,
  })
);

export const ObjectResolvers: IResolvers = {
  Date: String,

  Query: {
    getObjects: async () => {
      const dataObjects: any = await Data_Object.find({})
        .limit(10)
        .sort({ dateCreated: -1 })
        .exec();
      const count = await Data_Object.countDocuments({});
      return {
        dataObjects,
        count,
      };
    },
    getObjectTypes: async () => {
      const objectTypes: any = await ClassType.find({})
        .limit(10)
        .sort({ dateCreated: -1 })
        .exec();
      const count = await Data_Object.countDocuments({});
      return {
        objectTypes,
        count,
      };
    },

    deleteAllObjectTypes: async () => {
      await Data_Object.deleteMany({});
      return true;
    },
  },

  Data_Object: {
    properties: async (root, _) => {
      const classTypes: any = await ClassType.find({});

      const promises: any[] = [];
      const properties = {};
      root.properties.forEach((value, key) => {
        const propertyClassType = classTypes.find(
          (ct) => createPropertyName(ct.name) === key
        );
        if (propertyClassType) {
          const promise = Data_Object.find({ id: value });
          promises.push(promise);
        } else {
          if (typeof value === "string") {
            properties[key] = value;
          } else if (value === "Array") {
            properties[key] = value;
          }
        }
      });
      (await Promise.all(promises)).forEach((promise) => {
        const name = createPropertyName(promise[0].name);
        promise[0].properties.forEach((value, key) => {
          if (properties[name]) {
            properties[name][key] = value;
          } else {
            properties[name] = {};
            properties[name][key] = value;
          }
        });
      });

      return properties;
    },
  },

  ObjectType: {
    properties: async (root, _) => {
      const classTypes: any = await ClassType.find({});

      const properties = {};
      root.properties.forEach((value, key, map) => {
        const propertyClassType = classTypes.find(
          (ct) => createPropertyName(ct.name) === key
        );
        if (propertyClassType) {
          properties[key] = getClassTypeProperties(propertyClassType);
        } else {
          if (value === "String") {
            properties[key] = "";
          } else if (value === "Array") {
            properties[key] = [];
          }
        }
      });
      return properties;
    },
  },

  Mutation: {
    createObject: async (_, { name, properties }) => {
      const classTypes: any = await ClassType.find({});

      let o: any = new Data_Object({
        name,
        properties: {},
        groups: {},
        dateCreated: new Date(),
        dateModified: new Date(),
      });
      const promises: Promise<any>[] = [];
      const objectClassType = classTypes.find((ct) => ct.name === name);
      objectClassType.properties.forEach((value, key, map) => {
        if (value === "String") {
          const classType = classTypes.find(
            (ct) => createPropertyName(ct.name) === key
          );
          if (classType) {
            let po: any = new Data_Object({
              name: classType.name,
              properties: {},
              groups: {},
              dateCreated: new Date(),
              dateModified: new Date(),
            });
            Object.keys(properties[key]).forEach((vkey: string) => {
              po.properties.set(vkey, properties[key][vkey]);
            });
            po.id = po._id;
            o.properties.set(createPropertyName(key), po.id);
            promises.push(po.save());
          } else {
            o.properties.set(createPropertyName(key), properties[key]);
          }
        } else {
          o.groups[key] = value;
        }
      });
      await Promise.all(promises);
      o.id = o._id;
      await o.save();
      return o;
    },

    updateClassType: async (_, { id, name, properties, synonyms }) => {
      let ct = await ClassType.findOneAndUpdate(
        {
          id,
        },
        {
          name,
          properties,
          synonyms,
          dateModified: new Date(),
        }
      );
      return ct;
    },
    deleteAllObjectTypeById: async (_, { id }) => {
      await Data_Object.deleteMany({ id });
      return true;
    },
  },
};

import { gql } from "apollo-server-express";

export const ObjectTypes = gql`
  extend type Query {
    getObjects: PaginatedObjects
    getObjectTypes: PaginatedObjectTypes
    deleteAllObjectTypes: Boolean
  }

  type PaginatedObjects {
    dataObjects: [Data_Object]
    count: Int
  }

  type PaginatedObjectTypes {
    objectTypes: [ObjectType]
    count: Int
  }

  type Data_Object {
    id: String!
    name: String
    properties: Map
    groups: [String]
    dateCreated: Date!
    dateModified: Date!
  }

  type ObjectType {
    id: String!
    name: String
    properties: Map
    groups: [String]
    dateCreated: Date!
    dateModified: Date!
  }

  extend type Mutation {
    createObject(name: String, properties: Map, synonyms: [String]): ObjectType!

    updateObject(
      id: String
      name: String
      properties: Map
      synonyms: [String]
    ): ObjectType!

    deleteAllObjectTypeById(id: String): Boolean
  }
`;

const createPropertyName = (property: string) => {
  return property.toLowerCase().replace(" ", "-");
};

const reversePropertyName = (property: string) => {
  return property.toLowerCase().replace(" ", "-");
};

const getClassTypeProperties = (classType) => {
  let blankClassType = {};
  classType.properties.forEach((value, key, map) => {
    if (value === "String") {
      //   properties[key] = "";
      blankClassType[key] = "";
    } else if (classType.properties[key] === "Array") {
      //   properties[key] = [];
      blankClassType[key] = [];
    }
  });
  return blankClassType;
};
