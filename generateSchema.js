const fs = require("fs/promises");
const generateTypesFile = async () => {
  try {
    console.log("generateing schema.ts");
    const data = await fs.readFile("schema.graphql", { encoding: "utf8" });

    await fs.writeFile(
      `src/schema.ts`,
      `const { gql } = require('apollo-server-express');
      export const typeDefs = gql \` ${data} \` `
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

generateTypesFile();
