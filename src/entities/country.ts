import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Country extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Field(()=> ID)
    id!: number;

    @Column()
    @Field()
    code!: string
    
    @Column()
    @Field()
    name!: string;

    @Column()
    @Field()
    emoji!: string;

    @Column()
    @Field()
    continentCode!: string;
}

@InputType()
export class CountryCreateInput{
    @Field()
    code!: string;
    @Field()
    name!: string;
    @Field()
    emoji!: string;
    @Field()
    continentCode!: string;
}