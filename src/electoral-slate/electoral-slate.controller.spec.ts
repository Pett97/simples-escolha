import { Test, TestingModule } from '@nestjs/testing';
import { ElectoralSlateController } from './electoral-slate.controller';
import { ElectoralSlateService } from './electoral-slate.service';

describe('ElectoralSlateController', () => {
  let controller: ElectoralSlateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectoralSlateController],
      providers: [ElectoralSlateService],
    }).compile();

    controller = module.get<ElectoralSlateController>(ElectoralSlateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
