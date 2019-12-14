import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { DatabaseModule } from './database.module';
import { Relationship } from '../users/relationships/relationship.entity';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate the degrees of seperation between users', () => {

    for (let id = 1; id <= 100; id++) {

      const userRelationship = service.relationships.find(x => x.userId === id) as Relationship;

      const connections = userRelationship.connections;

      for (const connection of connections) {

        // some of these people somehow have a connection to themselves...
        // ignore this case
        if (id === connection) {
          continue;
        }

        const dos = service.graph.calculateDOS(id, connection);

        const msg = `Expect user [${id}] to have 1 DOS with user [${connection}]`;

        expect({ msg, dos }).toEqual({ msg, dos: 1 });
      }
    }

  });
});
