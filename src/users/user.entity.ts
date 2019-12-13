import { IUser } from './user.interface';

export type UserId = number;

export class User implements IUser {

  public static DoesNotExistError(id: number): Error {
    return new Error(`User with id ${id} does not exist`);
  }

  constructor(user: Partial<IUser> = {}) {
    this.id = user.id || 0;
    this.name = user.name || '';
  }

  public id: UserId;

  public name: string;

}
