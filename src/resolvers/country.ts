import { Arg, ID, Query, Mutation, Resolver } from "type-graphql";
import { Country, CountryCreateInput } from "../entities/country";

@Resolver(Country)
export class CountryResolver {
    @Query(()=>[Country])
    async allCountrys(): Promise<Country[]> {
        return await Country.find();
    }

    @Query(()=> Country, {nullable: true})
    async getOneCountry(@Arg("id", () => ID) id: number): Promise<Country | null> {
        return await Country.findOne({where:{
            id: id
        }});
    }

    @Query(()=> [Country], {nullable: true})
    async getCountryByContinent(@Arg("continent", () => String) continent: string): Promise<Country[] | null> {
        return await Country.find({where:{
            continentCode: continent
        }});
    }

    @Mutation(() => Country)
    async createCountry(@Arg("data", () => CountryCreateInput) data: CountryCreateInput): Promise<Country> {
        const newCountry = new Country();
        Object.assign(newCountry, data);

        await newCountry.save();
        return (newCountry);
    }
}