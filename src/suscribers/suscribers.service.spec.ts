import { Test, TestingModule } from '@nestjs/testing';
import { SuscribersService } from './suscribers.service';

describe('SuscribersService', () => {
  let service: SuscribersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuscribersService],
    }).compile();

    service = module.get<SuscribersService>(SuscribersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
