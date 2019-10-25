import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Records} from '../models';
import {RecordsRepository} from '../repositories';

export class RecordsController {
  constructor(
    @repository(RecordsRepository)
    public recordsRepository : RecordsRepository,
  ) {}

  @post('/records', {
    responses: {
      '200': {
        description: 'Records model instance',
        content: {'application/json': {schema: getModelSchemaRef(Records)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Records, {
            title: 'NewRecords',
            
          }),
        },
      },
    })
    records: Records,
  ): Promise<Records> {
    return this.recordsRepository.create(records);
  }

  @get('/records/count', {
    responses: {
      '200': {
        description: 'Records model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Records)) where?: Where<Records>,
  ): Promise<Count> {
    return this.recordsRepository.count(where);
  }

  @get('/records', {
    responses: {
      '200': {
        description: 'Array of Records model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Records)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Records)) filter?: Filter<Records>,
  ): Promise<Records[]> {
    return this.recordsRepository.find(filter);
  }

  @patch('/records', {
    responses: {
      '200': {
        description: 'Records PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Records, {partial: true}),
        },
      },
    })
    records: Records,
    @param.query.object('where', getWhereSchemaFor(Records)) where?: Where<Records>,
  ): Promise<Count> {
    return this.recordsRepository.updateAll(records, where);
  }

  @get('/records/{id}', {
    responses: {
      '200': {
        description: 'Records model instance',
        content: {'application/json': {schema: getModelSchemaRef(Records)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Records> {
    return this.recordsRepository.findById(id);
  }

  @patch('/records/{id}', {
    responses: {
      '204': {
        description: 'Records PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Records, {partial: true}),
        },
      },
    })
    records: Records,
  ): Promise<void> {
    await this.recordsRepository.updateById(id, records);
  }

  @put('/records/{id}', {
    responses: {
      '204': {
        description: 'Records PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() records: Records,
  ): Promise<void> {
    await this.recordsRepository.replaceById(id, records);
  }

  @del('/records/{id}', {
    responses: {
      '204': {
        description: 'Records DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recordsRepository.deleteById(id);
  }
}
