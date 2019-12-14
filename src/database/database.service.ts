import { Injectable } from '@nestjs/common';
import mockUsers from './mocks/persons.json';
import mockRelationships from './mocks/relationships.json';
import { User, UserId } from '../users/user.entity';
import { Relationship } from '../users/relationships/relationship.entity';
import { UserWithRelationships } from '../users/user-with-relationships.entity';
import { UserRelationshipGraph } from './user-relationship-graph';

@Injectable()
export class DatabaseService {

  public users: User[] = [];
  public relationships: Relationship[] = [];

  public get graph(): UserRelationshipGraph {
    const graph = new UserRelationshipGraph();
    for (const { userId, connections } of this.relationships) {
      for (const connection of connections) {
        graph.add(userId, connection);
      }
    }

    return graph;
  }

  constructor() {
    this.injectMockUsers();
    this.injectMockRelationships();
  }

  private injectMockUsers(): void {
    this.users = mockUsers.map(u => new User(u));
  }

  private injectMockRelationships(): void {
    this.relationships = mockRelationships.map(r => new Relationship(r));
  }

}
