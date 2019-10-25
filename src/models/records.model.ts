import { Entity, model, property } from '@loopback/repository';

@model()
export class Records extends Entity {
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
  album: string;

  @property({
    type: 'number',
  })
  authorsId?: number;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
  })
  comments?: string;


  constructor(data?: Partial<Records>) {
    super(data);
  }
}

export interface RecordsRelations {
  // describe navigational properties here
}

export type RecordsWithRelations = Records & RecordsRelations;
