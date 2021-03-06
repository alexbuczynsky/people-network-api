import { Graph } from '../utils';
import { UserId } from 'src/users/user.entity';

export class UserRelationshipGraph extends Graph<UserId> {

  constructor() {
    super();
  }

  public getMostPopularUser(): [UserId, number] {

    let count = 0;
    let maxUserId = -1;

    this.nodes.forEach((node, userId) => {
      if (node.childCount > count) {
        count = node.childCount;
        maxUserId = userId;
      }
    });

    return [maxUserId, count];
  }

  public getLeastPopularUser(): [UserId, number] {

    let count = -1;
    let minUserId = -1;

    this.nodes.forEach((node, userId) => {
      if (count === -1) {
        count = node.childCount;
        minUserId = userId;
      } else if (node.childCount > count) {
        count = node.childCount;
        minUserId = userId;
      }

    });

    return [minUserId, count];
  }

  public getChildrenOfUserByDOS(userId: UserId, degree: number): UserId[] {
    const users: UserId[] = [];

    this.nodes.forEach((node, id) => {
      const dos = this.calculateDOS(userId, id);

      if (id !== userId && dos === degree) {
        users.push(id);
      }
    });

    return users;
  }

}
