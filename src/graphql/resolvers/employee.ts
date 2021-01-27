/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Query, Resolver, Arg, Mutation } from "type-graphql";
import Employee, { EmployeeInput } from "graphql/schemas/employee";
import EmployeeModel from "db/models/employee";
import CarModel from "db/models/car";
import { v4 as uuidv4 } from "uuid";

@Resolver((of) => Employee)
export default class {

  createEmployee(@Arg("model") model: EmployeeInput) {
      return EmployeeModel.create({ ...model, id: uuidv4()});
  }

  @Mutation(() => Employee)
  async updateEmployee(@Arg("name") name: string, @Arg("id") id: string) {
    const EmployeeToUpdate = await EmployeeModel.findByPk(id);
    return EmployeeToUpdate.update({ name });
  }

  @Mutation(() => Employee)
  async upsertEmployee(@Arg("model") model: EmployeeInput) {
    if (!model.id) {
      model.id = uuidv4();
      model.createdAt = new Date();
    }
    const existingEmployee = await EmployeeModel.findByPk(model.id);
    if (existingEmployee) {
      model.createdAt = existingEmployee.createdAt;
    }
    await EmployeeModel.upsert({
      id: model.id,
      firstName: model.firstName === undefined ? existingEmployee.firstName : model.firstName,
      lastName: model.lastName === undefined ? existingEmployee.lastName : model.lastName,
      age: model.age === undefined ? existingEmployee.age : model.age,
      phoneNumber: model.phoneNumber === undefined ? existingEmployee.phoneNumber : model.phoneNumber,
      dealershipId: model.dealershipId === undefined ? existingEmployee.dealershipId : model.dealershipId,
    });
    return EmployeeModel.findByPk(model.id);
  }

  @Mutation(() => Boolean)
  async deleteEmployee(@Arg("id") id: string) {
    try {
      return await EmployeeModel.destroy({ where: { id } });
    } catch (error) {
      return error;
    }
  }

  @Query(() => [Employee])
  getEmployees() {
    return EmployeeModel.findAll();
  }

  @Query(() => [Employee])
  getEmployeesAtDealership(@Arg("dealershipId") dealershipId: string) {
    return EmployeeModel.findAll({ where: { dealershipId: dealershipId } });
  }

  @Query(() => Employee)
  getEmployee(@Arg("id") id: string) {
    return EmployeeModel.findByPk(id);
  }

  @Query(() => [Employee])
  async getEmployeesSpecializeNewCars() {
    const existingEmployees = await EmployeeModel.findAll();
    const newCarEmployees = [];

    existingEmployees.forEach(async(employee) => {
      const thisEmployeeCars = await CarModel.findAll({ where: { employeeId: employee.id } });
      let newCars = 0;
      let usedCars = 0;
      thisEmployeeCars.forEach((car) => {(car.isNew === true) ? ++newCars : ++usedCars;}); 
      if (newCars > usedCars) {
        newCarEmployees.push(employee);
      }
    });
    return newCarEmployees;
  }

  @Query(() => [Employee])
  async getEmployeesSpecializeNewCarsAtDealership(@Arg("dealershipId") dealershipId: string) {
    const existingEmployees = await EmployeeModel.findAll({ where: { dealershipId: dealershipId } });
    const newCarEmployees = [];

    existingEmployees.forEach(async(employee) => {
      const thisEmployeeCars = await CarModel.findAll({ where: { employeeId: employee.id } });
      let newCars = 0;
      let usedCars = 0;
      thisEmployeeCars.forEach((car) => {(car.isNew === true) ? ++newCars : ++usedCars;}); 
      if (newCars > usedCars) {
        newCarEmployees.push(employee);
      }
    });
    return newCarEmployees;
  }

  @Query(() => [Employee])
  async getEmployeesSpecializeUsedCars() {
    const existingEmployees = await EmployeeModel.findAll();
    const usedCarEmployees = [];

    existingEmployees.forEach(async(employee) => {
      const thisEmployeeCars = await CarModel.findAll({ where: { employeeId: employee.id } });
      let newCars = 0;
      let usedCars = 0;
      thisEmployeeCars.forEach((car) => {(car.isNew === false) ? ++usedCars : ++newCars;}); 
      if (usedCars > newCars) {
        usedCarEmployees.push(employee);
      }
    });
    return usedCarEmployees;
  }

  @Query(() => [Employee])
  async getEmployeesSpecializeUsedCarsAtDealership(@Arg("dealershipId") dealershipId: string) {
    const existingEmployees = await EmployeeModel.findAll({ where: { dealershipId: dealershipId } });
    const usedCarEmployees = [];

    existingEmployees.forEach(async(employee) => {
      const thisEmployeeCars = await CarModel.findAll({ where: { employeeId: employee.id } });
      let newCars = 0;
      let usedCars = 0;
      thisEmployeeCars.forEach((car) => {(car.isNew === false) ? ++usedCars : ++newCars;}); 
      if (usedCars > newCars) {
        usedCarEmployees.push(employee);
      }
    });
    return usedCarEmployees;
  }

  //bonus resolvers

  //FindAll for employee for top 3 in sales (quantity of cars sold)
  @Query(() => [Employee])
  async getTopThreeEmployeesSalesByQuantity() {
    const existingEmployees = await EmployeeModel.findAll();
    const employeesAndCarQuantities = [];

    existingEmployees.forEach(async(employee) => {
      const thisEmployeeCars = await CarModel.findAll({ where: { employeeId: employee.id } });
      employeesAndCarQuantities.push({employee: employee, numCars: thisEmployeeCars.length})
    });

    employeesAndCarQuantities.sort((a, b) => (a.numCars > b.numCars) ? 1 : -1);

    const topQuantityEmployees = [];

    if (employeesAndCarQuantities.length < 4) {
      employeesAndCarQuantities.forEach((employeeAndNum) => {topQuantityEmployees.push(employeeAndNum.employee)});
    }else{
      for(let i=0; i < 3; i++) {
        topQuantityEmployees.push((employeesAndCarQuantities.pop()).employee);
      }
    }

    return topQuantityEmployees;
  }

  //FindAll for employee for top 3 in sales (total price of cars sold)
  @Query(() => [Employee])
  async getTopThreeEmployeesSalesByPrice() {
    const existingEmployees = await EmployeeModel.findAll();
    const employeesAndCarPrices = [];

    existingEmployees.forEach(async(employee) => {
      const thisEmployeeCars = await CarModel.findAll({ where: { employeeId: employee.id } });
      let thisEmployeePriceTotal = 0;
      thisEmployeeCars.forEach((eachCar) => {
        thisEmployeePriceTotal = thisEmployeePriceTotal + eachCar.price;
      });
      employeesAndCarPrices.push({employee: employee, totalPrice: thisEmployeePriceTotal})
    });

    employeesAndCarPrices.sort((a, b) => (a.totalPrice > b.totalPrice) ? 1 : -1);

    const topPriceEmployees = [];

    if (employeesAndCarPrices.length < 4) {
      employeesAndCarPrices.forEach((employeeAndPrice) => {topPriceEmployees.push(employeeAndPrice.employee)});
    }else{
      for(let i=0; i < 3; i++) {
        topPriceEmployees.push((employeesAndCarPrices.pop()).employee);
      }
    }

    return topPriceEmployees;
  }

  //FindAll for employee for top 3 in sales at X dealership (quantity of cars sold)
  @Query(() => [Employee])
  async getTopThreeEmployeesSalesByQuantityAtDealership(@Arg("dealershipId") dealershipId: string) {
    const existingEmployees = await EmployeeModel.findAll({ where: { dealershipId: dealershipId } });
    const employeesAndCarQuantities = [];

    existingEmployees.forEach(async(employee) => {
      const thisEmployeeCars = await CarModel.findAll({ where: { employeeId: employee.id } });
      employeesAndCarQuantities.push({employee: employee, numCars: thisEmployeeCars.length})
    });

    employeesAndCarQuantities.sort((a, b) => (a.numCars > b.numCars) ? 1 : -1);

    const topQuantityEmployees = [];

    if (employeesAndCarQuantities.length < 4) {
      employeesAndCarQuantities.forEach((employeeAndNum) => {topQuantityEmployees.push(employeeAndNum.employee)});
    }else{
      for(let i=0; i < 3; i++) {
        topQuantityEmployees.push((employeesAndCarQuantities.pop()).employee);
      }
    }

    return topQuantityEmployees;
  }

  //FindAll for employee for top 3 in sales at X dealership (total price of cars sold)
  @Query(() => [Employee])
  async getTopThreeEmployeesSalesByPriceAtDealership(@Arg("dealershipId") dealershipId: string) {
    const existingEmployees = await EmployeeModel.findAll({ where: { dealershipId: dealershipId } });
    const employeesAndCarPrices = [];

    existingEmployees.forEach(async(employee) => {
      const thisEmployeeCars = await CarModel.findAll({ where: { employeeId: employee.id } });
      let thisEmployeePriceTotal = 0;
      thisEmployeeCars.forEach((eachCar) => {
        thisEmployeePriceTotal = thisEmployeePriceTotal + eachCar.price;
      });
      employeesAndCarPrices.push({employee: employee, totalPrice: thisEmployeePriceTotal})
    });

    employeesAndCarPrices.sort((a, b) => (a.totalPrice > b.totalPrice) ? 1 : -1);

    const topPriceEmployees = [];

    if (employeesAndCarPrices.length < 4) {
      employeesAndCarPrices.forEach((employeeAndPrice) => {topPriceEmployees.push(employeeAndPrice.employee)});
    }else{
      for(let i=0; i < 3; i++) {
        topPriceEmployees.push((employeesAndCarPrices.pop()).employee);
      }
    }

    return topPriceEmployees;
  }
}
