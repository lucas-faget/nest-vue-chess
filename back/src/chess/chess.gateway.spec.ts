import { Test, TestingModule } from '@nestjs/testing';
import { ChessGateway } from './chess.gateway';

describe('ChessGateway', () => {
  let gateway: ChessGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChessGateway],
    }).compile();

    gateway = module.get<ChessGateway>(ChessGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
