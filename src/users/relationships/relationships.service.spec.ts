import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipsService } from './relationships.service';
import { Relationship } from './relationship.entity';
import { UsersModule } from '../users.module';

describe('RelationshipsService', () => {
  let service: RelationshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    service = module.get<RelationshipsService>(RelationshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find introducers between user 2 and user 12', () => {

    const userA = service.findByUserId(2) as Relationship;
    const userB = service.findByUserId(12) as Relationship;

    expect(userA).toBeDefined();
    expect(userB).toBeDefined();

    const relationships = service.findCommonConnections(userA.connections, userB.connections);

    expect(relationships.includes(13)).toBe(true);
  });
});
