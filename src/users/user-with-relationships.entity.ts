import { User } from './user.entity';
import { Relationship } from './relationships/relationship.entity';
import { IUserWithRelationships } from './user-with-relationships.interface';

export class UserWithRelationships extends User implements IUserWithRelationships {

  public connections: Relationship['connections'] = [];

  constructor(props: Partial<IUserWithRelationships>) {
    super(props);

    this.connections = props.connections || [];
  }

}
