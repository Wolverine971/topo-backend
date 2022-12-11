import { IResolvers } from "@graphql-tools/utils";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const Node = mongoose.model(
  "Node",
  new Schema({
    key: String,
    value: String,
  })
);
export const NodeType = mongoose.model(
  "NodeType",
  new Schema({
    value: String,
    dateCreated: Date,
    dateModified: Date,
  })
);
export const Category = mongoose.model(
  "Category",
  new Schema({
    value: String,
    dateCreated: Date,
    dateModified: Date,
  })
);

export const Entity = mongoose.model(
  "Entity",
  new Schema({
    id: String,
    name: String,
    attributes: {
      type: Map,
      of: [Map],
    },
    type: String,
    synonyms: [String],
    resources: [Map],
    dateCreated: Date,
    dateModified: Date,
  })
);

export const EntityType = mongoose.model(
  "EntityType",
  new Schema({
    id: String,
    name: String,
    attributes: {
      type: Map,
      of: [String],
    },
    synonyms: [String],
    dateCreated: Date,
    dateModified: Date,
  })
);

export const EntityResolvers: IResolvers = {
  Query: {
    nodes: async () => Node.find({}),
    getNode: async (nodeId) => Node.findOne({ id: nodeId }),
    categories: async () => Category.find(),
    nodeTypes: () => NodeType.find(),
    entities: async () => Entity.find(),
    entityTypes: async () => EntityType.find(),
    deleteAllEntities: async () => {
      await Entity.deleteMany({});
      return true;
    },
    deleteEntityById: async (_, { id }) => {
      const e = await Entity.deleteOne({ id });
      return true;
    },
    deleteAllEntityTypes: async () => {
      await EntityType.deleteMany({});
      return true;
    },
    deleteEntityTypeById: async (_, { id }) => {
      const e = await EntityType.deleteOne({ id });
      return true;
    },
    ontologyWords: async () => {
      // const e = await \
      return Entity.find().then((entities) => {
        return entities.map((entity: any) => {
          console.log(entity.name);
          return entity.name;
        }); // ...(*) to this
      });
      // return e;
    },
  },

  Mutation: {
    createNode: async (_, { node }) => {
      const n = new Node({
        key: node,
        dateCreated: new Date(),
        dateModified: new Date(),
      });
      return await n.save();
    },

    createCategory: async (_, { value }) => {
      const c = new Category({
        value,
        dateCreated: new Date(),
        dateModified: new Date(),
      });
      return await c.save();
    },
    createNodeType: async (_, { value }) => {
      const n = new NodeType({
        value,
        dateCreated: new Date(),
        dateModified: new Date(),
      });
      return await n.save();
    },
    createEntity: async (_, { entity }) => {
      const e = new Entity({
        name: entity.name,
        attributes: entity.attributes,
        synonyms: entity.synonyms,
        type: entity.type,
        resources: entity.resources,
        dateCreated: new Date(),
        dateModified: new Date(),
      });
      e.id = e._id;
      await e.save();
      //  return e

      Object.keys(entity.attributes).forEach((key) => {
        entity.attributes[key].forEach(
          (verbAttr: { key: string; value: string }) => {
            EntityType.exists({ name: verbAttr.key }).then((resp) => {
              if (!resp) {
                const e = new EntityType({
                  name: verbAttr.key,
                  attributes: {},
                  synonyms: [],
                  dateCreated: new Date(),
                  dateModified: new Date(),
                });
                e.id = e._id;
                e.save();
              }
            });
          }
        );
      });
      return e;
    },
    createEntityType: async (_, { entityType }) => {
      const e = new EntityType({
        name: entityType.name,
        attributes: entityType.attributes,
        synonyms: entityType.synonyms,
        dateCreated: new Date(),
        dateModified: new Date(),
      });
      e.id = e._id;
      return await e.save();
    },
    updateEntity: async (_, { entity }) => {
      const e = Entity.findOneAndUpdate(
        { name: entity.name },
        {
          name: entity.name,
          attributes: entity.attributes,
          synonyms: entity.synonyms,
          type: entity.type,
          resources: entity.resources,
          dateCreated: new Date(),
          dateModified: new Date(),
        }
      );
      //  return e

      Object.keys(entity.attributes).forEach((key) => {
        entity.attributes[key].forEach(
          (verbAttr: { key: string; value: string }) => {
            EntityType.exists({ name: verbAttr.key }).then((resp) => {
              if (!resp) {
                const e = new EntityType({
                  name: verbAttr.key,
                  attributes: {},
                  synonyms: [],
                  dateCreated: new Date(),
                  dateModified: new Date(),
                });
                e.id = e._id;
                e.save();
              }
            });
          }
        );
      });
      return e;
    },
    updateEntityType: async (_, { entityType }) => {
      const e = EntityType.findOneAndUpdate(
        { name: entityType.name },
        {
          name: entityType.name,
          attributes: entityType.attributes,
          synonyms: entityType.synonyms,
          dateCreated: new Date(),
          dateModified: new Date(),
        }
      );
      return e;
    },
    deleteEntitiy: async (_, { name }) => {
      const e = await Entity.deleteOne({ name });
      return true;
    },
  },
};

import { gql } from "apollo-server-express";

export const entityTypes = gql`
  scalar Date
  scalar Map

  type Query {
    hello: String!
    nodes: [Node]
    getNode(nodeId: String): Node
    categories: [Category]
    nodeTypes: [NodeType]
    entities: [Entity]
    entityTypes: [EntityType]
    deleteAllEntities: Boolean
    deleteEntityById(id: String): Boolean
    deleteAllEntityTypes: Boolean
    deleteEntityTypeById(id: String): Boolean
    ontologyWords: [String]
  }

  type Node {
    key: String!
    value: String
  }

  type Category {
    value: String
    dateCreated: Date
    dateModified: Date
  }
  type NodeType {
    value: String
    dateCreated: Date
    dateModified: Date
  }
  type Entity {
    id: String
    name: String
    type: String
    attributes: Map
    synonyms: [String]
    resources: [Map]
    dateCreated: Date
    dateModified: Date
  }
  type EntityType {
    id: String
    name: String
    attributes: Map
    synonyms: [String]
    dateCreated: Date
    dateModified: Date
  }

  type Mutation {
    createNode(node: String): Node
    createCategory(value: String): Category
    createNodeType(value: String): NodeType
    createEntity(entity: Map): Entity
    createEntityType(entityType: Map): EntityType

    updateEntity(entity: Map): Entity
    updateEntityType(entityType: Map): EntityType
    deleteEntitiy(name: String): Boolean
  }
`;
