import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export default class Employee {
  @Field() id: string;
  @Field() firstName: string;
  @Field() lastName: string;
  @Field() age: number;
  @Field() phoneNumber: number;
  @Field() dealershipId: string;
  @Field() updatedAt: Date;
  @Field() createdAt: Date;
}

@InputType()
export class EmployeeInput {
  @Field({ nullable: true }) id?: string;
  @Field({ nullable: true }) firstName: string;
  @Field({ nullable: true }) lastName: string;
  @Field({ nullable: true }) age: number;
  @Field({ nullable: true }) phoneNumber: number;
  @Field({ nullable: true }) dealershipId: string;
  @Field({ nullable: true }) updatedAt?: Date
  @Field({ nullable: true }) createdAt?: Date
}
