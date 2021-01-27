/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Car, { CarInput } from "graphql/schemas/car";
import CarModel from "db/models/car";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

@Resolver((of) => Car)
export default class {

  createCar(@Arg("model") model: CarInput) {
    return CarModel.create({ ...model, id: uuidv4()});
  }

  @Mutation(() => Car)
  async updateCar(@Arg("name") name: string, @Arg("id") id: string) {
    const CarToUpdate = await CarModel.findByPk(id);
    return CarToUpdate.update({ name });
  }

  @Mutation(() => Car)
  async upsertCar(@Arg("model") model: CarInput) {
    if (!model.id) {
      model.id = uuidv4();
      model.createdAt = new Date();
    }
    const existingCar = await CarModel.findByPk(model.id);
    if (existingCar) {
      model.createdAt = existingCar.createdAt;
    }
    await CarModel.upsert({
      id: model.id,
      name: model.name === undefined ? existingCar.name : model.name,
    });
    return CarModel.findByPk(model.id);
  }

  @Mutation(() => Boolean)
  async deleteCar(@Arg("id") id: string) {
    try {
      return await CarModel.destroy({ where: { id } });
    } catch (error) {
      return error;
    }
  }

  @Query(() => [Car])
  getCars() {
    return CarModel.findAll();
  }

  @Query(() => [Car])
  getCarsNotSold() {
    return CarModel.findAll({ where: { sold: false } });
  }

  @Query(() => [Car])
  getCarsAtDealership(@Arg ("dealershipId") dealershipId: string) {
    return CarModel.findAll({ where: { dealershipId: dealershipId } });
  }

  @Query(() => [Car])
  getCarsAtDealershipNotSold(@Arg ("dealershipId") dealershipId: string) {
    return CarModel.findAll({ where: { dealershipId: dealershipId , sold: false } });
  }

  @Query(() => Car)
  getCar(@Arg("id") id: string) {
    return CarModel.findByPk(id);
  }

  @Query(() => [Car])
  getCarsLessThanPriceNotSold(@Arg ("price") price: number) {
    return CarModel.findAll({ where: { [Op.lt]: price , sold: false } });
  }

  @Query(() => [Car])
  getCarsNewNotSold() {
    return CarModel.findAll({ where: { isNew: true , sold: false } });
  }

  @Query(() => [Car])
  getCarsUsedNotSold() {
    return CarModel.findAll({ where: { isNew: false , sold: false } });
  }

  @Query(() => [Car])
  getCarsLessThanMilesNotSold(@Arg ("miles") miles: number) {
    return CarModel.findAll({ where: { [Op.lt]: miles , sold: false } });
  }

  @Query(() => [Car])
  getCarsClientAndSold(@Arg ("client") client: string) {
    return CarModel.findAll({ where: { client: client , sold: true } });
  }

  @Query(() => [Car])
  getCarsEmployeeAndSold(@Arg ("employee") employee: string) {
    return CarModel.findAll({ where: { employee: employee , sold: true } });
  }
}
