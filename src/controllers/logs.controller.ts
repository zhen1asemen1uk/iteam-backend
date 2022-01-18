import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Logs} from '../models';
import {LogsRepository} from '../repositories';

export class LogsController {
  constructor(
    @repository(LogsRepository)
    public logsRepository : LogsRepository,
  ) {}

  @post('/logs')
  @response(200, {
    description: 'Logs model instance',
    content: {'application/json': {schema: getModelSchemaRef(Logs)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Logs, {
            title: 'NewLogs',
            exclude: ['id'],
          }),
        },
      },
    })
    logs: Omit<Logs, 'id'>,
  ): Promise<Logs> {
    return this.logsRepository.create(logs);
  }

  @get('/logs')
  @response(200, {
    description: 'Array of Logs model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Logs, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Logs) filter?: Filter<Logs>,
  ): Promise<Logs[]> {
    return this.logsRepository.find(filter);
  }

  @get('/logs/{id}')
  @response(200, {
    description: 'Logs model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Logs, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Logs, {exclude: 'where'}) filter?: FilterExcludingWhere<Logs>
  ): Promise<Logs> {
    return this.logsRepository.findById(id, filter);
  }

  
  @del('/logs/{id}')
  @response(204, {
    description: 'Logs DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.logsRepository.deleteById(id);
  }
}