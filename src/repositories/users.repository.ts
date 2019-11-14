import { DefaultCrudRepository } from '@loopback/repository';
import { Users, UsersRelations, Roles } from '../models';
import { MydbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
  > {


  constructor(
    @inject('datasources.mydb') dataSource: MydbDataSource,
  ) {
    super(Users, dataSource);
  }
}
