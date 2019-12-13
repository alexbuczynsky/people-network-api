import { Injectable } from '@nestjs/common';
import mockUsers from './mocks/persons.json';
import mockRelationships from './mocks/relationships.json';
import { User, UserId } from '../users/user.entity';
import { Relationship } from '../users/relationships/relationship.entity';
import { UserWithRelationships } from '../users/user-with-relationships.entity.js';

@Injectable()
export class DatabaseService {

  public users: User[] = [];
  public relationships: Relationship[] = [];

  public get usersWithRelationships(): UserWithRelationships[] {

    type UserTuple = [User, Relationship['connections']];

    const userMap = new Map<UserId, UserTuple>();

    for (const user of this.users) {
      userMap.set(user.id, [user, []]);
    }

    for (const { userId, connections } of this.relationships) {
      const [user] = userMap.get(userId) as UserTuple;
      userMap.set(user.id, [user, connections]);
    }

    const usersWithRelationships: UserWithRelationships[] = [];

    userMap.forEach(([user, connections]) => {
      usersWithRelationships.push(new UserWithRelationships({
        ...user,
        connections,
      }));
    });

    return usersWithRelationships;

  }

  constructor() {
    this.injectMockUsers();
    this.injectMockRelationships();
  }

  public injectMockUsers(): void {
    this.users = mockUsers.map(u => new User(u));
  }

  public injectMockRelationships(): void {
    this.relationships = mockRelationships.map(r => new Relationship(r));
  }
}
