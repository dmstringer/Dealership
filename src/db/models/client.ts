import {
  Table,
  Column,
  Model,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  modelName: "Client",
  tableName: "Clients",
})
export default class Client extends Model<Client> {
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
  phoneNumber: number;

  @AllowNull(false)
  @Column
  lookingForNewCar: boolean;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
