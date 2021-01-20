import {
  Table,
  Column,
  Model,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  modelName: "Dealership",
  tableName: "Dealerships",
})
export default class Dealership extends Model<Dealership> {
  @AllowNull(false)
  @Column
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  location: string;

  @AllowNull(false)
  @Column
  phoneNumber: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
