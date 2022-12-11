import { IResolvers } from "@graphql-tools/utils";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

import { ClassType } from "./classTypes";

export const Data_Object = mongoose.model(
  "Data_Object",
  new Schema({
    id: String,
    name: String,
    root: Boolean,
    properties: {
      type: Map,
      of: Schema.Types.Mixed,
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
  // Date: String,

  Query: {
    getObjects: async () => {
      const dataObjects: any = await Data_Object.find({ root: true })
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

      // inherit properties from parent class
      const parentType: any = await ClassType.findOne({
        name: camelize(root.name),
      });
      const properties = {};
      if (!parentType?.properties) {
        console.log(parentType);
      }
      parentType.properties.forEach((value, key) => {
        const propertyClassType = classTypes.find(
          (ct) => camelize(ct.name) === key
        );
        if (propertyClassType) {
          properties[key] = {};
          propertyClassType.properties.forEach((pvalue, pkey) => {
            if (pvalue === "String") {
              properties[key][pkey] = value;
            } else if (pvalue === "Array") {
              properties[key][pkey] = [];
            }
          });
        } else if (value === "String") {
          properties[key] = value;
        } else if (value === "Array") {
          properties[key] = [];
        }
      });

      const promises: any[] = [];
      // const properties = {};
      root.properties.forEach((value, key) => {
        const propertyClassType = classTypes.find(
          (ct) => camelize(ct.name) === key
        );
        if (propertyClassType) {
          const promise = Data_Object.find({ id: value });
          promises.push(promise);
        } else {
          if (typeof value === "string") {
            properties[key] = value;
          } else if (Array.isArray(value)) {
            properties[key] = value;
          }
        }
      });
      (await Promise.all(promises)).forEach((promise) => {
        const name = camelize(promise[0].name);
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
          (ct) => camelize(ct.name) === key
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
        name: camelize(name),
        properties: {},
        root: true,
        groups: {},
        dateCreated: new Date(),
        dateModified: new Date(),
      });
      const promises: Promise<any>[] = [];
      const objectClassType = classTypes.find((ct) => ct.name === name);
      objectClassType.properties.forEach((value, key, map) => {
        if (value === "String") {
          const classType = classTypes.find((ct) => camelize(ct.name) === key);
          if (classType) {
            let po: any = new Data_Object({
              name: camelize(classType.name),
              properties: {},
              root: false,
              groups: {},
              dateCreated: new Date(),
              dateModified: new Date(),
            });
            Object.keys(properties[key]).forEach((vkey: string) => {
              po.properties.set(vkey, properties[key][vkey]);
            });
            po.id = po._id;
            o.properties.set(camelize(key), po.id);
            promises.push(po.save());
          } else {
            o.properties.set(camelize(key), properties[key]);
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

    updateObject: async (_, { id, properties }) => {
      const promises: Promise<any>[] = [];
      const classTypes: any = await ClassType.find({});
      let dO: any = await Data_Object.findOne({
        id,
      });
      for await (const key of Object.keys(properties)) {
        if (typeof properties[key] === "string") {
          dO.properties.set(camelize(key), properties[key]);
        } else if (Array.isArray(properties[key])) {
          // dO.groups[key] = properties;
          dO.properties.set(camelize(key), properties[key]);
        } else {
          const classType = classTypes.find((ct) => camelize(ct.name) === key);
          if (classType) {
            let id = dO.properties.get(key);
            let po: any = await Data_Object.findOne({ id });

            po.properties.forEach((pvalue, pkey, map) => {
              po.properties.set(pkey, properties[key][pkey]);
            });

            promises.push(po.save());
          } else {
            dO.properties.set(camelize(key), properties[key]);
          }
        }
      }

      await Promise.all(promises);
      await dO.save();
      return dO;
    },

    deleteAllObjectTypeById: async (_, { id }) => {
      await Data_Object.deleteMany({ id });
      return true;
    },
    deleteObjectById: async (_, { id }) => {
      await Data_Object.deleteOne({ id });
      return true;
    },
  },
};

import { gql } from "apollo-server-express";
import { camelize, getClassTypeProperties } from "../utils";

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
    deleteObjectById(id: String): Boolean
  }
`;
