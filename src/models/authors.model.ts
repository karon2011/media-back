import { Entity, model, property, hasMany } from '@loopback/repository';
import { Records } from './records.model';

@model({ settings: { strict: false } })
export class Authors extends Entity {
  @property({
    type: 'number',
    id: true,
    // required: true,
    // generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => Records)
  records: Records[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Authors>) {
    super(data);
  }
}

export interface AuthorsRelations {
  // describe navigational properties here
}

export type AuthorsWithRelations = Authors & AuthorsRelations;
