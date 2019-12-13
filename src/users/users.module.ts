import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { RelationshipsService } from './relationships/relationships.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [UsersService, RelationshipsService],
  controllers: [UsersController],
})
export class UsersModule { }
