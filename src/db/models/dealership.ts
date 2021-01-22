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
  modelName: "Dealership",
  tableName: "Dealerships",
})
export default class Dealership extends Model<Dealership> {
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
