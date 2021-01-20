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
  @Field() id?: string;
  @Field() name: string;
  @Field() location: string;
  @Field() phoneNumber: number;
  @Field() updatedAt?: Date
  @Field() createdAt?: Date
}
