import {
  Table,
  Column,
  Model,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  modelName: "Employee",
  tableName: "Employees",
})
export default class Employee extends Model<Employee> {
  @AllowNull(false)
  @Column
  id: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  age: number;

  @AllowNull(false)
  @Column
  phoneNumber: number;

  @AllowNull(false)
  @Column
  dealershipId: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
