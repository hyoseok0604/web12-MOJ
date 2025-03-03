import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CachingModule } from 'src/caching/caching.module';
import { CachingService } from 'src/caching/caching.service';
import { Problem } from 'src/problems/entities/problem.entity';
import { User } from 'src/users/entities/user.entity';
import { Language } from './entities/language.entity';
import { Result } from './entities/result.entity';
import { State } from './entities/state.entity';
import { Submission } from './entities/submission.entity';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Language,
      Result,
      State,
      Submission,
      User,
      Problem,
      Result,
    ]),
    forwardRef(() => CachingModule),
  ],
  exports: [SubmissionsService],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
