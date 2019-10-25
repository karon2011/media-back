import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { Authors, AuthorsRelations, Records } from '../models';
import { MydbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { RecordsRepository } from './records.repository';

export class AuthorsRepository extends DefaultCrudRepository<
  Authors,
  typeof Authors.prototype.id,
  AuthorsRelations
  > {

  public readonly records: HasManyRepositoryFactory<Records, typeof Authors.prototype.id>;

  constructor(
    @inject('datasources.mydb')
    dataSource: MydbDataSource,
    @repository.getter('RecordsRepository')
    protected recordsRepositoryGetter: Getter<RecordsRepository>,
  ) {
    super(Authors, dataSource);
    this.records = this.createHasManyRepositoryFactoryFor('records', recordsRepositoryGetter);
  }
}
