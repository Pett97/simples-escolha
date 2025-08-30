import { Test, TestingModule } from '@nestjs/testing';
import { ElectoralSlateService } from './electoral-slate.service';

describe('ElectoralSlateService', () => {
  let service: ElectoralSlateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectoralSlateService],
    }).compile();

    service = module.get<ElectoralSlateService>(ElectoralSlateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
