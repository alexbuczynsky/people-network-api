import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Relationship } from './relationship.entity';
import { User, UserId } from '../user.entity';

@Injectable()
export class RelationshipsService {

  constructor(private readonly db: DatabaseService) { }

  public findByUserId(userId: number): Relationship | undefined {
    return this.db.relationships.find(x => x.userId === userId);
  }

  /**
   *
   *
   * @param {number} firstUserId
   * @param {number} secondUserId
   * @throws {Error[]} erros
   * @memberof RelationshipsService
   */
  public findIntroducers(userId1: UserId, userId2: UserId): UserId[] {

    const introducers: UserId[] = [];

    for (const { userId, connections } of this.db.relationships) {
      let user1Exists = false;
      let user2Exists = false;

      for (const id of connections) {
        if (id === userId1) {
          user1Exists = true;
        } else if (id === userId2) {
          user2Exists = true;
        }

        if (user1Exists && user2Exists) {
          introducers.push(userId);
          break;
        }
      }
    }

    return introducers;

  }

  public getSetOfDegreeConnectedUsers(id: UserId, degree: number): User[] {
    const graph = this.db.graph;

    const userIds = graph.getChildrenOfUserByDOS(id, degree);
    return this.db.users.filter(x => userIds.includes(x.id));
  }

}
