import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  IsUUID,
} from "sequelize-typescript";

@Table({
  modelName: "Car",
  tableName: "Cars",
})
export default class Car extends Model<Car> {
  @AllowNull(false)
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  doors: number;

  @AllowNull(false)
  @Column
  automatic: boolean;

  @AllowNull(false)
  @Column
  isNew: boolean;

  @AllowNull(false)
  @Column
  price: number;

  @AllowNull(false)
  @Column
  miles: number;

  @AllowNull(false)
  @Column
  dealershipId: string;

  @Column
  clientId: string;

  @Column
  employeeId: string;

  @AllowNull(false)
  @Column
  sold: boolean;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
