import { ClassType } from "./resolvers/classTypes";
import { Data_Object } from "./resolvers/objects";

const fs = require("fs/promises");
const crypto = require("crypto");

export const generateNewClassType = async ({
  name,
  properties,
  synonyms,
}: {
  name: string;
  properties: any[];
  synonyms: any;
}) => {
  try {
    const classTypes: any = await ClassType.find({});
    const propertiesArray: string[] = [];
    //   for await (const key of Object.keys(properties)) {
    properties.forEach((p) => {
      const classType = classTypes.find((ct) => ct.name === p.name);
      if (classType) {
        propertiesArray.push(`${camelize(p.name)}: ${classType.name}`);
      } else if (p.type === "String") {
        //   dO.properties.set(camelize(key), properties[key]);
        propertiesArray.push(`${camelize(p.name)}: String`);
      } else if (p.type === "Array") {
        //   dO.groups[key] = properties;
        propertiesArray.push(`${camelize(p.name)}: [String]`);
      }
    });
    //   }
    const allClassTypes: string[] = [];
    const newClassType = `type ${camelize(name)} {
        ${propertiesArray.join("\n")}
        dateCreated: Date!
        dateModified: Date!
    }`;
    allClassTypes.push(newClassType);

    classTypes.forEach((cls) => {
      console.log(cls);

      const classProps: any[] = [];

      cls.properties.forEach((value, key, map) => {
        const classType = classTypes.find((ct) => ct.name === key);
        if (classType) {
          classProps.push(`${camelize(key)}: ${classType.name}`);
        } else if (value === "String") {
          //   dO.properties.set(camelize(key), properties[key]);
          classProps.push(`${key}: String`);
        } else if (value === "Array") {
          //   dO.groups[key] = properties;
          classProps.push(`${key}: [String]`);
        }
      });
      const clsTypes = `type ${cls.name} {
          ${classProps.join("\n")}
          dateCreated: Date!
          dateModified: Date!
        }`;
      allClassTypes.push(clsTypes);

      const clsEnums = `enum ClassTypeList {
          ${classProps.join("\n")}
        }`;
      allClassTypes.push(clsEnums);
    });

    // await updateSchema();
    const content = allClassTypes.join("\n");
    await fs.writeFile("./newSchema.graphql", content);
  } catch (err) {
    console.log(err);
  }
};

export const updateClasses = async () => {
  try {
    const classTypes: any = await ClassType.find({});
    const allClassTypes: string[] = [];

    classTypes.forEach((cls) => {
      console.log(cls);

      const classProps: any[] = [];

      cls.properties.forEach((value, key, map) => {
        const classType = classTypes.find((ct) => ct.name === key);
        if (classType) {
          classProps.push(`${camelize(key)}: ${classType.name}`);
        } else if (value === "String") {
          //   dO.properties.set(camelize(key), properties[key]);
          classProps.push(`${key}: String`);
        } else if (value === "Array") {
          //   dO.groups[key] = properties;
          classProps.push(`${key}: [String]`);
        }
      });
      const clsType = `type ${camelize(cls.name)} {
          ${classProps.join("\n")}
          dateCreated: Date!
          dateModified: Date!
        }`;
      allClassTypes.push(clsType);
    });

    const unionClassTypes = `union AllClassTypes = ${classTypes
      .map((c) => c.name)
      .join(" | ")}`;

    const clsEnums = `enum ClassTypeList {
          ${classTypes.map((c) => c.name).join(" \n ")}
        }`;
    allClassTypes.push(clsEnums);

    allClassTypes.push(unionClassTypes);

    const getAllClassTypesQuery = `extend type Query {
      getAllClassTypes: [AllClassTypes]
    }`;
    allClassTypes.push(getAllClassTypesQuery);

    // await updateSchema();
    const content = allClassTypes.join("\n");
    await fs.writeFile("./newSchema.graphql", content);

    // setTimeout(async () => {
    const data = await fs.readFile("./newSchema.graphql", {
      encoding: "utf8",
    });

    await fs.writeFile(
      `src/newSchema.ts`,
      `const { gql } = require('apollo-server-express');
      export const newTypeDefs = gql \` ${data} \` `
    );
    // }, 5000);
  } catch (err) {
    console.log(err);
  }
};

const updateSchema = async (target, value) => {
  const data = await fs.readFile("schema.graphql", { encoding: "utf8" });

  const UnionDataObjectIndex = data.indexof("Union DataObject");
  if (UnionDataObjectIndex && UnionDataObjectIndex >= 0) {
    // finish removing previous info and splicing in updated info
    const firstPart = data.slice(0, UnionDataObjectIndex);
    const secondPart = data.slice(UnionDataObjectIndex);
    // secondPart.indexof('type'
  } else {
    await fs.appendFile("schema.graphql", `Union DataObject = ${value}`);
  }
  const classTypeIndex = data.indexof("type ClassType");
  if (classTypeIndex >= 0) {
  }

  console.log(data);
};

const propertyCreate = async (id, properties) => {
  const promises: Promise<any>[] = [];
  const classTypes: any = await ClassType.find({});
  let dO: any = await Data_Object.findOne({
    id,
  });
  for await (const key of Object.keys(properties)) {
    if (typeof properties[key] === "string") {
      dO.properties.set(camelize(key), properties[key]);
    } else if (Array.isArray(properties[key])) {
      dO.groups[key] = properties;
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
};

// export const camelize = (property: string) => {
//   return property.toLowerCase().replace(" ", "-");
// };

export const getClassTypeProperties = (classType) => {
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

export const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};
