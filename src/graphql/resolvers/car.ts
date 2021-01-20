import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Car, { CarInput } from "../schemas/car";
import CarModel from "../../db/models/car";
import { v4 as uuidv4 } from "uuid";

@Resolver((of) => Car)
export default class {

    @Mutation(() => Car)
    createDealership(@Arg("model") model: CarInput) {
      return CarModel.create({ id: uuidv4(), name, location, phoneNumber });
    }
}
