import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User, UserId } from './user.entity';
import { PopularityQuery } from './queries.interfaces';

@Injectable()
export class UsersService {

  private popularityHashInitialized = false;
  private popularityHash = new Map<UserId, number>();

  constructor(private readonly db: DatabaseService) { }

  /**
   * Gets all users
   *
   * @returns {IUser[]}
   * @memberof UsersService
   */
  public findAll(options: { popularity?: PopularityQuery } = {}): User[] {

    const {
      popularity,
    } = options;

    const users = this.db.users;

    if (popularity === PopularityQuery.most) {
      const user = this.findPopularity('max');
      return [user];
    }

    if (popularity === PopularityQuery.least) {
      const user = this.findPopularity('min');
      return [user];
    }

    return users;
  }

  public findOne(id: number): User | undefined {
    return this.db.users.find(x => x.id === id);
  }

  private buildPopularityHash(): void {
    for (const relationship of this.db.relationships) {
      for (const userId of relationship.connections) {
        const rank = this.popularityHash.get(userId) || 0;
        this.popularityHash.set(userId, rank + 1);
      }
    }
  }

  public findPopularity(type: 'min' | 'max') {
    if (!this.popularityHashInitialized) {
      this.buildPopularityHash();
    }

    const [userId] = Array.from(this.popularityHash).reduce(([previousId, previousRank], [currentId, currentRank]) => {

      if (type === 'min' && currentRank < previousRank) {
        return [currentId, currentRank];
      }

      if (type === 'max' && currentRank > previousRank) {
        return [currentId, currentRank];
      }

      return [previousId, previousRank];
    });
    return this.findOne(userId) as User;
  }

}
