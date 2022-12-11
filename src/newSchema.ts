const { gql } = require("apollo-server-express");
export const newTypeDefs = gql`
  type friend {
    person: person
    dateCreated: Date!
    dateModified: Date!
  }
  type person {
    firstname: String
    dateCreated: Date!
    dateModified: Date!
  }
  type locations {
    address: String
    name: String
    dateCreated: Date!
    dateModified: Date!
  }
  type geography {
    address: String
    state: String
    zipCode: String
    city: String
    coordinates: [String]
    dateCreated: Date!
    dateModified: Date!
  }
  enum ClassTypeList {
    friend
    person
    locations
    geography
  }
  union AllClassTypes = friend | person | locations | geography
  extend type Query {
    getAllClassTypes: [AllClassTypes]
  }
`;
