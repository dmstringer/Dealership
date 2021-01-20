import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export default class Employee {
  @Field() id: string;
  @Field() firstName: string;
  @Field() lastName: string;
  @Field() phoneNumber: number;
  @Field() lookingForNewCar: boolean;
  @Field() updatedAt: Date;
  @Field() createdAt: Date;
}

@InputType()
export class EmployeeInput {
  @Field() id?: string;
  @Field() firstName: string;
  @Field() lastName: string;
  @Field() phoneNumber: number;
  @Field() lookingForNewCar: boolean;
  @Field() updatedAt?: Date
  @Field() createdAt?: Date
}
