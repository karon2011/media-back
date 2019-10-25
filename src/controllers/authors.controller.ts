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
import {Authors} from '../models';
import {AuthorsRepository} from '../repositories';

export class AuthorsController {
  constructor(
    @repository(AuthorsRepository)
    public authorsRepository : AuthorsRepository,
  ) {}

  @post('/authors', {
    responses: {
      '200': {
        description: 'Authors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Authors)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Authors, {
            title: 'NewAuthors',
            
          }),
        },
      },
    })
    authors: Authors,
  ): Promise<Authors> {
    return this.authorsRepository.create(authors);
  }

  @get('/authors/count', {
    responses: {
      '200': {
        description: 'Authors model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Authors)) where?: Where<Authors>,
  ): Promise<Count> {
    return this.authorsRepository.count(where);
  }

  @get('/authors', {
    responses: {
      '200': {
        description: 'Array of Authors model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Authors)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Authors)) filter?: Filter<Authors>,
  ): Promise<Authors[]> {
    return this.authorsRepository.find(filter);
  }

  @patch('/authors', {
    responses: {
      '200': {
        description: 'Authors PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Authors, {partial: true}),
        },
      },
    })
    authors: Authors,
    @param.query.object('where', getWhereSchemaFor(Authors)) where?: Where<Authors>,
  ): Promise<Count> {
    return this.authorsRepository.updateAll(authors, where);
  }

  @get('/authors/{id}', {
    responses: {
      '200': {
        description: 'Authors model instance',
        content: {'application/json': {schema: getModelSchemaRef(Authors)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Authors> {
    return this.authorsRepository.findById(id);
  }

  @patch('/authors/{id}', {
    responses: {
      '204': {
        description: 'Authors PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Authors, {partial: true}),
        },
      },
    })
    authors: Authors,
  ): Promise<void> {
    await this.authorsRepository.updateById(id, authors);
  }

  @put('/authors/{id}', {
    responses: {
      '204': {
        description: 'Authors PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() authors: Authors,
  ): Promise<void> {
    await this.authorsRepository.replaceById(id, authors);
  }

  @del('/authors/{id}', {
    responses: {
      '204': {
        description: 'Authors DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.authorsRepository.deleteById(id);
  }
}
