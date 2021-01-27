import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export default class Client {
  @Field() id: string;
  @Field() firstName: string;
  @Field() lastName: string;
  @Field() phoneNumber: number;
  @Field() lookingForNewCar: boolean;
  @Field() updatedAt: Date;
  @Field() createdAt: Date;
}

@InputType()
export class ClientInput {
  @Field({ nullable: true }) id?: string;
  @Field({ nullable: true }) firstName: string;
  @Field({ nullable: true }) lastName: string;
  @Field({ nullable: true }) phoneNumber: number;
  @Field({ nullable: true }) lookingForNewCar: boolean;
  @Field({ nullable: true }) updatedAt?: Date
  @Field({ nullable: true }) createdAt?: Date
}
