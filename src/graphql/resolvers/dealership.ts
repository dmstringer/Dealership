import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Dealership, { DealershipInput } from "../schemas/dealership";
import DealershipModel from "../../db/models/dealership";
import { v4 as uuidv4 } from "uuid";

@Resolver((of) => Dealership)
export default class {
  
  @Mutation(() => Dealership)
  createDealership(@Arg("name") name:string, @Arg("location") location:string, @Arg("phoneNumber") phoneNumber:number) {
    return DealershipModel.create({ id: uuidv4(), name, location, phoneNumber });
  }

  @Mutation(() => Dealership)
  async updateDealership(@Arg("name") name: string, @Arg("id") id: string) {
    const dealershipToUpdate = await DealershipModel.findByPk(id);
    return dealershipToUpdate.update({ name });
  }

  @Mutation(() => Dealership)
  async upsertDealership(@Arg("model") model: DealershipInput) {
    if (!model.id) {
      model.id = uuidv4();
      model.createdAt = new Date();
    }
    const existingDealership = await DealershipModel.findByPk(model.id);
    if (existingDealership) {
      model.createdAt = existingDealership.createdAt;
    }
    await DealershipModel.upsert({
      id: model.id,
      name: model.name === undefined ? existingDealership.name : model.name,
    });
    return DealershipModel.findByPk(model.id);
  }

  @Mutation(() => Boolean)
  async deleteDealership(@Arg("id") id: string) {
    const deleted = await DealershipModel.destroy({ where: { id } });
    return deleted ? true : false;
  }

  @Query(() => [Dealership])
  getDealerships() {
    return DealershipModel.findAll();
  }

  @Query(() => Dealership)
  getDealership(@Arg("id") id: string) {
    return DealershipModel.findByPk(id);
  }

  @Query(() => Dealership)
  getDealershipWhere(@Arg("location") id: string) {
    return DealershipModel.findOne({ where: {location:"Some Location"} });
  }
}