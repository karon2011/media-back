import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { Roles, RolesRelations, Users } from '../models';
import { MydbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
  > {

  public readonly users: BelongsToAccessor<Users, typeof Roles.prototype.id>;

  constructor(
    @inject('datasources.mydb') dataSource: MydbDataSource,
  ) {
    super(Roles, dataSource);
  }
}
