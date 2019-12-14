import { Controller, Get, Param, NotFoundException, Query, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RelationshipsService } from './relationships/relationships.service';
import { User } from './user.entity';
import { PopularityQuery } from './queries.interfaces';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService,
    private readonly relationshipService: RelationshipsService,
  ) { }

  private mapConnectionsToUsers(connections: number[]) {
    return connections.map(userId => this.userService.findOne(userId)) as User[];
  }

  @Get()
  @ApiOperation({
    summary: 'Can return all users, the most / least popular users',
  })
  @ApiQuery({
    name: 'popularity',
    enum: PopularityQuery,
    required: false,
    description: 'find the user that is the most / least popular',
  })
  public async findAll(
    @Query('popularity') popularity: string,
  ): Promise<User[]> {

    if (popularity) {
      if (PopularityQuery[popularity] === undefined) {
        throw new BadRequestException(`popularity must be one of [${Object.values(PopularityQuery).join(', ')}]`);
      }
    }

    return this.userService.findAll({
      popularity: popularity as PopularityQuery,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by id',
  })
  public async findOne(@Param('id') id: string) {

    const user = this.userService.findOne(parseInt(id, 10));

    if (user === undefined) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    } else {
      return user;
    }
  }

  @Get(':id/relationships')
  @ApiOperation({
    summary: 'Get the connections from user id=X',
  })
  public async findUserRelationships(@Param('id') userId: string): Promise<User[]> {

    const relationship = this.relationshipService.findByUserId(parseInt(userId, 10));

    if (relationship === undefined) {
      throw new NotFoundException(`Relationship with userId ${userId} does not exist`);
    } else {
      return this.mapConnectionsToUsers(relationship.connections);
    }
  }

  @Get(':id/relationships/count')
  @ApiOperation({
    summary: 'How many total connections does user id=X have?',
  })
  public async getUserRelationshipCount(@Param('id') userId: string): Promise<number> {

    const connections = await this.findUserRelationships(userId);

    return connections.length;
  }

  @Get(':id/mutual-connections/:id2')
  @ApiOperation({
    summary: 'Who can introduce user id=X to user id=Y?',
  })
  public async findMutualConnections(@Param('id') user1Id: string, @Param('id2') user2Id: string): Promise<User[]> {

    // Make sure both users exist first... either function will throw an error if the user is not found
    await this.findOne(user1Id);
    await this.findOne(user2Id);

    const introducers = this.relationshipService.findIntroducers(parseInt(user1Id, 10), parseInt(user2Id, 10));

    return this.mapConnectionsToUsers(introducers);
  }

  @Get(':id/degree-connections/:degree')
  @ApiOperation({
    summary: 'Find users seperated by N degrees',
  })
  public async getDegreeConnectedUsers(@Param('id') userId: string, @Param('degree') degree: string): Promise<User[]> {

    const user = await this.findOne(userId);

    return this.relationshipService.getSetOfDegreeConnectedUsers(user.id, parseInt(degree, 10));
  }

}
