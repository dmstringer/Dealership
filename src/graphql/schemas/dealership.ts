import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export default class Dealership {
  @Field() id: string;
  @Field() name: string;
  @Field() location: string;
  @Field() phoneNumber: number;
  @Field() updatedAt: Date;
  @Field() createdAt: Date;
}

@InputType()
export class DealershipInput {
  @Field({ nullable: true }) id?: string;
  @Field({ nullable: true }) name: string;
  @Field({ nullable: true }) location: string;
  @Field({ nullable: true }) phoneNumber: number;
  @Field({ nullable: true }) updatedAt?: Date
  @Field({ nullable: true }) createdAt?: Date
}
