import { buildSchema } from "type-graphql";
import { CountryResolver } from "./src/resolvers/country";

export const getSchema = async ()=>{
    const schema = buildSchema({
        resolvers: [CountryResolver]
    })
    return schema;
}