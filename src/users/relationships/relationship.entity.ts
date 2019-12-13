import { IRelationship } from './relationship.interface';

export class Relationship implements IRelationship {

  public userId: number;

  public connections: number[];

  constructor(props: Partial<IRelationship> = {}) {
    this.userId = props.userId || 0;
    this.connections = props.connections || [];
  }
}
