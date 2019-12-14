import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the most popular user', () => {
    const [user, rank] = service.findPopularity('max');

    const maxRank = Math.max(...Array.from(service.popularityHash.values()));

    expect(rank).toBe(maxRank);
  });

  it('should get the least popular user', () => {
    const [user, rank] = service.findPopularity('min');

    const minRank = Math.min(...Array.from(service.popularityHash.values()));

    expect(rank).toBe(minRank);
  });
});
