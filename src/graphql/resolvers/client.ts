import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Client, { ClientInput } from "../schemas/client";
import ClientModel from "../../db/models/client";
import { v4 as uuidv4 } from "uuid";

@Resolver((of) => Client)
export default class {
  createClient(@Arg("model") model: ClientInput) {
      return ClientModel.create({ ...model, id: uuidv4()});
  }

  @Mutation(() => Client)
  async updateClient(@Arg("name") name: string, @Arg("id") id: string) {
    const ClientToUpdate = await ClientModel.findByPk(id);
    return ClientToUpdate.update({ name });
  }

  @Mutation(() => Client)
  async upsertClient(@Arg("model") model: ClientInput) {
    if (!model.id) {
      model.id = uuidv4();
      model.createdAt = new Date();
    }
    const existingClient = await ClientModel.findByPk(model.id);
    if (existingClient) {
      model.createdAt = existingClient.createdAt;
    }
    await ClientModel.upsert({
      id: model.id,
      firstName: model.firstName === undefined ? existingClient.firstName : model.firstName,
      lastName: model.lastName === undefined ? existingClient.lastName : model.lastName,
      phoneNumber: model.phoneNumber === undefined ? existingClient.phoneNumber : model.phoneNumber,
      lookingForNewCar: model.lookingForNewCar === undefined ? existingClient.lookingForNewCar : model.lookingForNewCar,
    });
    return ClientModel.findByPk(model.id);
  }

  @Mutation(() => Boolean)
  async deleteClient(@Arg("id") id: string) {
    const deleted = await ClientModel.destroy({ where: { id } });
    return deleted ? true : false;
  }
  
  @Query(() => [Client])
  getClients() {
    return ClientModel.findAll();
  }

  @Query(() => [Client])
  getClientsAtDealership(@Arg("dealershipId") dealershipId: string) {
    return ClientModel.findAll({ where: { dealershipId: dealershipId } });
  }

  @Query(() => Client)
  getClient(@Arg("id") id: string) {
    return ClientModel.findByPk(id);
  }

  @Query(() => [Client])
  getClientsLookingForNewCar() {
    return ClientModel.findAll({ where: { lookingForNewCar: true } });
  }

  @Query(() => [Client])
  getClientsLookingForUsedCar() {
    return ClientModel.findAll({ where: { lookingForNewCar: false } });
  }
}
