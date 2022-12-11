const { gql } = require('apollo-server-express');
      export const typeDefs = gql ` type Query {
  getClassTypes: PaginatedClassTypes
  deleteAllClassTypes: Boolean

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

  getObjects: PaginatedObjects
  getObjectTypes: PaginatedObjectTypes
  deleteAllObjectTypes: Boolean
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

  createClassType(name: String, properties: Map, synonyms: [String]): ClassType!

  updateClassType(
    id: String
    name: String
    properties: Map
    synonyms: [String]
  ): ClassType!

  deleteAllClassTypeById(id: String): Boolean

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

scalar Date
scalar Map

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
 ` 