import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export default class Car {
  @Field() id: string;
  @Field() name: string;
  @Field() doors: number;
  @Field() automatic: boolean;
  @Field() isNew: boolean;
  @Field() price: number;
  @Field() miles: number;
  @Field() dealershipId: string;
  @Field() ClientId: string;
  @Field() employeeId: string;
  @Field() sold: boolean;
  @Field() updatedAt: Date;
  @Field() createdAt: Date;
}

@InputType()
export class CarInput {
  @Field() id?: string;
  @Field() name: string;
  @Field() doors: number;
  @Field() automatic: boolean;
  @Field() isNew: boolean;
  @Field() price: number;
  @Field() miles: number;
  @Field() dealershipId: string;
  @Field({ nullable: true }) ClientId?: string;
  @Field({ nullable: true }) employeeId?: string;
  @Field() sold: boolean;
  @Field() updatedAt?: Date
  @Field() createdAt?: Date
}
