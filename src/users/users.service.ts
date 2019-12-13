import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User } from './user.entity';
import { PopularityQuery } from './queries.interfaces';
import { UserWithRelationships } from './user-with-relationships.entity';

@Injectable()
export class UsersService {

  constructor(private readonly db: DatabaseService) { }

  /**
   * Gets all users
   *
   * @returns {IUser[]}
   * @memberof UsersService
   */
  public findAll(options: { popularity?: PopularityQuery } = {}): UserWithRelationships[] {

    const {
      popularity,
    } = options;

    const users = this.db.usersWithRelationships;

    if (popularity === PopularityQuery.most) {
      let popularityCount = 0;

      // there is an edge case where many users have the same number of total connections...
      for (const user of users) {
        if (user.connections.length > popularityCount) {
          popularityCount = user.connections.length;
        }
      }

      return users.filter(user => user.connections.length === popularityCount);
    }

    if (popularity === PopularityQuery.least) {
      let popularityCount = users[0].connections.length;

      // there is an edge case where many users have the same number of total connections...
      for (const user of users) {
        if (user.connections.length < popularityCount) {
          popularityCount = user.connections.length;
        }
      }

      return users.filter(user => user.connections.length === popularityCount);
    }

    return users;
  }

  public findOne(id: number): User | undefined {
    return this.db.users.find(x => x.id === id);
  }
}
