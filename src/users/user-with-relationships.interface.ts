import { IUser } from './user.interface';
import { IRelationship } from './relationships/relationship.interface';

export type IUserWithRelationships = IUser & Pick<IRelationship, 'connections'>;
