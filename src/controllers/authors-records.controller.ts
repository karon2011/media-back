import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Authors,
  Records,
} from '../models';
import {AuthorsRepository} from '../repositories';

export class AuthorsRecordsController {
  constructor(
    @repository(AuthorsRepository) protected authorsRepository: AuthorsRepository,
  ) { }

  @get('/authors/{id}/records', {
    responses: {
      '200': {
        description: 'Array of Records\'s belonging to Authors',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Records)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Records>,
  ): Promise<Records[]> {
    return this.authorsRepository.records(id).find(filter);
  }

  @post('/authors/{id}/records', {
    responses: {
      '200': {
        description: 'Authors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Records)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Authors.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Records, {
            title: 'NewRecordsInAuthors',
            exclude: ['id'],
            optional: ['authorsId']
          }),
        },
      },
    }) records: Omit<Records, 'id'>,
  ): Promise<Records> {
    return this.authorsRepository.records(id).create(records);
  }

  @patch('/authors/{id}/records', {
    responses: {
      '200': {
        description: 'Authors.Records PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Records, {partial: true}),
        },
      },
    })
    records: Partial<Records>,
    @param.query.object('where', getWhereSchemaFor(Records)) where?: Where<Records>,
  ): Promise<Count> {
    return this.authorsRepository.records(id).patch(records, where);
  }

  @del('/authors/{id}/records', {
    responses: {
      '200': {
        description: 'Authors.Records DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Records)) where?: Where<Records>,
  ): Promise<Count> {
    return this.authorsRepository.records(id).delete(where);
  }
}
