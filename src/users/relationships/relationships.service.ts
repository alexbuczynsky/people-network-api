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
  public findCommonConnections(
    firstUserConnections: Relationship['connections'],
    secondUserConnections: Relationship['connections'],
  ): UserId[] {

    const connectionHash = new Map<UserId, number>();

    for (const c of firstUserConnections) {
      const currentCount = connectionHash.get(c) || 0;
      connectionHash.set(c, currentCount + 1);
    }

    for (const c of secondUserConnections) {
      const currentCount = connectionHash.get(c) || 0;
      connectionHash.set(c, currentCount + 1);
    }

    const introducers: UserId[] = [];

    connectionHash.forEach((count, userId) => {
      if (count > 1) {
        introducers.push(userId);
      }
    });

    return introducers;

  }

}
