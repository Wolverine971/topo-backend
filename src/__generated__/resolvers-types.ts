import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Map: any;
};

export type Category = {
  __typename?: 'Category';
  dateCreated?: Maybe<Scalars['Date']>;
  dateModified?: Maybe<Scalars['Date']>;
  value?: Maybe<Scalars['String']>;
};

export type ClassType = {
  __typename?: 'ClassType';
  dateCreated: Scalars['Date'];
  dateModified: Scalars['Date'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  properties?: Maybe<Scalars['Map']>;
  synonyms?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Data_Object = {
  __typename?: 'Data_Object';
  dateCreated: Scalars['Date'];
  dateModified: Scalars['Date'];
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  properties?: Maybe<Scalars['Map']>;
};

export type Entity = {
  __typename?: 'Entity';
  attributes?: Maybe<Scalars['Map']>;
  dateCreated?: Maybe<Scalars['Date']>;
  dateModified?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resources?: Maybe<Array<Maybe<Scalars['Map']>>>;
  synonyms?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
};

export type EntityType = {
  __typename?: 'EntityType';
  attributes?: Maybe<Scalars['Map']>;
  dateCreated?: Maybe<Scalars['Date']>;
  dateModified?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  synonyms?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory?: Maybe<Category>;
  createClassType: ClassType;
  createEntity?: Maybe<Entity>;
  createEntityType?: Maybe<EntityType>;
  createNode?: Maybe<Node>;
  createNodeType?: Maybe<NodeType>;
  createObject: ObjectType;
  deleteAllClassTypeById?: Maybe<Scalars['Boolean']>;
  deleteAllObjectTypeById?: Maybe<Scalars['Boolean']>;
  deleteEntitiy?: Maybe<Scalars['Boolean']>;
  deleteObjectById?: Maybe<Scalars['Boolean']>;
  updateClassType: ClassType;
  updateEntity?: Maybe<Entity>;
  updateEntityType?: Maybe<EntityType>;
  updateObject: ObjectType;
};


export type MutationCreateCategoryArgs = {
  value?: InputMaybe<Scalars['String']>;
};


export type MutationCreateClassTypeArgs = {
  name?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Scalars['Map']>;
  synonyms?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationCreateEntityArgs = {
  entity?: InputMaybe<Scalars['Map']>;
};


export type MutationCreateEntityTypeArgs = {
  entityType?: InputMaybe<Scalars['Map']>;
};


export type MutationCreateNodeArgs = {
  node?: InputMaybe<Scalars['String']>;
};


export type MutationCreateNodeTypeArgs = {
  value?: InputMaybe<Scalars['String']>;
};


export type MutationCreateObjectArgs = {
  name?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Scalars['Map']>;
  synonyms?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationDeleteAllClassTypeByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteAllObjectTypeByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteEntitiyArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteObjectByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateClassTypeArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Scalars['Map']>;
  synonyms?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdateEntityArgs = {
  entity?: InputMaybe<Scalars['Map']>;
};


export type MutationUpdateEntityTypeArgs = {
  entityType?: InputMaybe<Scalars['Map']>;
};


export type MutationUpdateObjectArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  properties?: InputMaybe<Scalars['Map']>;
  synonyms?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Node = {
  __typename?: 'Node';
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type NodeType = {
  __typename?: 'NodeType';
  dateCreated?: Maybe<Scalars['Date']>;
  dateModified?: Maybe<Scalars['Date']>;
  value?: Maybe<Scalars['String']>;
};

export type ObjectType = {
  __typename?: 'ObjectType';
  dateCreated: Scalars['Date'];
  dateModified: Scalars['Date'];
  groups?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  properties?: Maybe<Scalars['Map']>;
};

export type PaginatedClassTypes = {
  __typename?: 'PaginatedClassTypes';
  classTypes?: Maybe<Array<Maybe<ClassType>>>;
  count?: Maybe<Scalars['Int']>;
};

export type PaginatedObjectTypes = {
  __typename?: 'PaginatedObjectTypes';
  count?: Maybe<Scalars['Int']>;
  objectTypes?: Maybe<Array<Maybe<ObjectType>>>;
};

export type PaginatedObjects = {
  __typename?: 'PaginatedObjects';
  count?: Maybe<Scalars['Int']>;
  dataObjects?: Maybe<Array<Maybe<Data_Object>>>;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Maybe<Category>>>;
  deleteAllClassTypes?: Maybe<Scalars['Boolean']>;
  deleteAllEntities?: Maybe<Scalars['Boolean']>;
  deleteAllEntityTypes?: Maybe<Scalars['Boolean']>;
  deleteAllObjectTypes?: Maybe<Scalars['Boolean']>;
  deleteEntityById?: Maybe<Scalars['Boolean']>;
  deleteEntityTypeById?: Maybe<Scalars['Boolean']>;
  entities?: Maybe<Array<Maybe<Entity>>>;
  entityTypes?: Maybe<Array<Maybe<EntityType>>>;
  getClassTypes?: Maybe<PaginatedClassTypes>;
  getNode?: Maybe<Node>;
  getObjectTypes?: Maybe<PaginatedObjectTypes>;
  getObjects?: Maybe<PaginatedObjects>;
  hello: Scalars['String'];
  nodeTypes?: Maybe<Array<Maybe<NodeType>>>;
  nodes?: Maybe<Array<Maybe<Node>>>;
  ontologyWords?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryDeleteEntityByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryDeleteEntityTypeByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetNodeArgs = {
  nodeId?: InputMaybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  ClassType: ResolverTypeWrapper<ClassType>;
  Data_Object: ResolverTypeWrapper<Data_Object>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Entity: ResolverTypeWrapper<Entity>;
  EntityType: ResolverTypeWrapper<EntityType>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Map: ResolverTypeWrapper<Scalars['Map']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<Node>;
  NodeType: ResolverTypeWrapper<NodeType>;
  ObjectType: ResolverTypeWrapper<ObjectType>;
  PaginatedClassTypes: ResolverTypeWrapper<PaginatedClassTypes>;
  PaginatedObjectTypes: ResolverTypeWrapper<PaginatedObjectTypes>;
  PaginatedObjects: ResolverTypeWrapper<PaginatedObjects>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Category: Category;
  ClassType: ClassType;
  Data_Object: Data_Object;
  Date: Scalars['Date'];
  Entity: Entity;
  EntityType: EntityType;
  Int: Scalars['Int'];
  Map: Scalars['Map'];
  Mutation: {};
  Node: Node;
  NodeType: NodeType;
  ObjectType: ObjectType;
  PaginatedClassTypes: PaginatedClassTypes;
  PaginatedObjectTypes: PaginatedObjectTypes;
  PaginatedObjects: PaginatedObjects;
  Query: {};
  String: Scalars['String'];
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  dateCreated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  dateModified?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ClassTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClassType'] = ResolversParentTypes['ClassType']> = ResolversObject<{
  dateCreated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  dateModified?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  properties?: Resolver<Maybe<ResolversTypes['Map']>, ParentType, ContextType>;
  synonyms?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Data_ObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Data_Object'] = ResolversParentTypes['Data_Object']> = ResolversObject<{
  dateCreated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  dateModified?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  groups?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  properties?: Resolver<Maybe<ResolversTypes['Map']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Entity'] = ResolversParentTypes['Entity']> = ResolversObject<{
  attributes?: Resolver<Maybe<ResolversTypes['Map']>, ParentType, ContextType>;
  dateCreated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  dateModified?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resources?: Resolver<Maybe<Array<Maybe<ResolversTypes['Map']>>>, ParentType, ContextType>;
  synonyms?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EntityTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['EntityType'] = ResolversParentTypes['EntityType']> = ResolversObject<{
  attributes?: Resolver<Maybe<ResolversTypes['Map']>, ParentType, ContextType>;
  dateCreated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  dateModified?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  synonyms?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface MapScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Map'], any> {
  name: 'Map';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, Partial<MutationCreateCategoryArgs>>;
  createClassType?: Resolver<ResolversTypes['ClassType'], ParentType, ContextType, Partial<MutationCreateClassTypeArgs>>;
  createEntity?: Resolver<Maybe<ResolversTypes['Entity']>, ParentType, ContextType, Partial<MutationCreateEntityArgs>>;
  createEntityType?: Resolver<Maybe<ResolversTypes['EntityType']>, ParentType, ContextType, Partial<MutationCreateEntityTypeArgs>>;
  createNode?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, Partial<MutationCreateNodeArgs>>;
  createNodeType?: Resolver<Maybe<ResolversTypes['NodeType']>, ParentType, ContextType, Partial<MutationCreateNodeTypeArgs>>;
  createObject?: Resolver<ResolversTypes['ObjectType'], ParentType, ContextType, Partial<MutationCreateObjectArgs>>;
  deleteAllClassTypeById?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationDeleteAllClassTypeByIdArgs>>;
  deleteAllObjectTypeById?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationDeleteAllObjectTypeByIdArgs>>;
  deleteEntitiy?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationDeleteEntitiyArgs>>;
  deleteObjectById?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<MutationDeleteObjectByIdArgs>>;
  updateClassType?: Resolver<ResolversTypes['ClassType'], ParentType, ContextType, Partial<MutationUpdateClassTypeArgs>>;
  updateEntity?: Resolver<Maybe<ResolversTypes['Entity']>, ParentType, ContextType, Partial<MutationUpdateEntityArgs>>;
  updateEntityType?: Resolver<Maybe<ResolversTypes['EntityType']>, ParentType, ContextType, Partial<MutationUpdateEntityTypeArgs>>;
  updateObject?: Resolver<ResolversTypes['ObjectType'], ParentType, ContextType, Partial<MutationUpdateObjectArgs>>;
}>;

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NodeTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['NodeType'] = ResolversParentTypes['NodeType']> = ResolversObject<{
  dateCreated?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  dateModified?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ObjectTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ObjectType'] = ResolversParentTypes['ObjectType']> = ResolversObject<{
  dateCreated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  dateModified?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  groups?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  properties?: Resolver<Maybe<ResolversTypes['Map']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedClassTypesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedClassTypes'] = ResolversParentTypes['PaginatedClassTypes']> = ResolversObject<{
  classTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['ClassType']>>>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedObjectTypesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedObjectTypes'] = ResolversParentTypes['PaginatedObjectTypes']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  objectTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['ObjectType']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginatedObjectsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedObjects'] = ResolversParentTypes['PaginatedObjects']> = ResolversObject<{
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dataObjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Data_Object']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  categories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  deleteAllClassTypes?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deleteAllEntities?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deleteAllEntityTypes?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deleteAllObjectTypes?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deleteEntityById?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<QueryDeleteEntityByIdArgs>>;
  deleteEntityTypeById?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<QueryDeleteEntityTypeByIdArgs>>;
  entities?: Resolver<Maybe<Array<Maybe<ResolversTypes['Entity']>>>, ParentType, ContextType>;
  entityTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['EntityType']>>>, ParentType, ContextType>;
  getClassTypes?: Resolver<Maybe<ResolversTypes['PaginatedClassTypes']>, ParentType, ContextType>;
  getNode?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, Partial<QueryGetNodeArgs>>;
  getObjectTypes?: Resolver<Maybe<ResolversTypes['PaginatedObjectTypes']>, ParentType, ContextType>;
  getObjects?: Resolver<Maybe<ResolversTypes['PaginatedObjects']>, ParentType, ContextType>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nodeTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['NodeType']>>>, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Node']>>>, ParentType, ContextType>;
  ontologyWords?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Category?: CategoryResolvers<ContextType>;
  ClassType?: ClassTypeResolvers<ContextType>;
  Data_Object?: Data_ObjectResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Entity?: EntityResolvers<ContextType>;
  EntityType?: EntityTypeResolvers<ContextType>;
  Map?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NodeType?: NodeTypeResolvers<ContextType>;
  ObjectType?: ObjectTypeResolvers<ContextType>;
  PaginatedClassTypes?: PaginatedClassTypesResolvers<ContextType>;
  PaginatedObjectTypes?: PaginatedObjectTypesResolvers<ContextType>;
  PaginatedObjects?: PaginatedObjectsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

