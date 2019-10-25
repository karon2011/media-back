import { DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { Records, RecordsRelations } from '../models';
import { MydbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class RecordsRepository extends DefaultCrudRepository<
  Records,
  typeof Records.prototype.id,
  RecordsRelations
  > {

  constructor(
    @inject('datasources.mydb') dataSource: MydbDataSource,
  ) {
    super(Records, dataSource);
  }
}
