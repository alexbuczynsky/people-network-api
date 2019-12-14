import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User } from './user.entity';
import { PopularityQuery } from './queries.interfaces';

@Injectable()
export class UsersService {

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
      const [user] = this.findMostPopularUser();
      return [user];
    }

    if (popularity === PopularityQuery.least) {
      const [user] = this.findLeastPopularUser();
      return [user];
    }

    return users;
  }

  public findOne(id: number): User | undefined {
    return this.db.users.find(x => x.id === id);
  }

  public findMostPopularUser(): [User, number] {

    const [userId, rank] = this.db.graph.getMostPopularUser();

    return [this.findOne(userId) as User, rank];
  }

  public findLeastPopularUser(): [User, number] {

    const [userId, rank] = this.db.graph.getLeastPopularUser();

    return [this.findOne(userId) as User, rank];
  }

}
