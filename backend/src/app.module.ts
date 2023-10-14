import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChessGateway } from './chess/chess.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChessGateway],
})
export class AppModule {}
