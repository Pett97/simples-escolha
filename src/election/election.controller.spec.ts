import { Test, TestingModule } from '@nestjs/testing';
import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';
import { ElectionController } from './election.controller';
import { ElectionService } from './election.service';
import { NanoIdService } from 'src/common/services/nanoIdService';
import { AuthGuard } from 'src/auth/auth.guard';

// Mock do nanoid (garantia)
jest.mock("nanoid", () => ({
  customAlphabet: () => () => "MOCK_ID",
}));

let mockElectionService: any;

const mockNanoIdService = {
  generateId: jest.fn(() => 'FAKE_ID'),
  generateToken8: jest.fn(() => 'FAKE_TOKEN'),
};

describe('ElectionController', () => {
  let controller: ElectionController;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockElectionService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionController],
      providers: [
        { provide: ElectionService, useValue: mockElectionService },
        { provide: NanoIdService, useValue: mockNanoIdService },
      ],
    })
      //sobreecreve para poder "passar "
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ElectionController>(ElectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create()', () => {
    it('should call service.create with DTO', async () => {
      const dto: CreateElectionDto = {
        votingDate: new Date("2025-05-05"),
        maxVote: 100,
      };

      const expectedResult = { id: 1, ...dto };
      mockElectionService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(mockElectionService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll()', () => {
    it('should return all elections', async () => {
      const data = [
        { id: 1, votingDate: new Date(), maxVote: 10 },
        { id: 2, votingDate: new Date(), maxVote: 20 },
      ];

      mockElectionService.findAll.mockResolvedValue(data);

      const result = await controller.findAll();

      expect(result).toEqual(data);
    });
  });

  describe('findOne()', () => {
    it('should return election by ID', async () => {
      const mockElection = {
        id: 1,
        votingDate: new Date(),
        maxVote: 50,
      };

      mockElectionService.findOne.mockResolvedValue(mockElection);

      const result = await controller.findOne("1");

      expect(mockElectionService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockElection);
    });
  });

  describe('update()', () => {
    it('should update election', async () => {
      const dto: UpdateElectionDto = {
        votingDate: new Date("2025-09-09"),
        maxVote: 99,
      };

      const updated = { id: 1, ...dto };

      mockElectionService.update.mockResolvedValue(updated);

      const result = await controller.update("1", dto);

      expect(mockElectionService.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(updated);
    });
  });

  describe('remove()', () => {
    it('should remove election', async () => {
      const deleted = {
        id: 1,
        votingDate: new Date(),
        maxVote: 50,
      };

      mockElectionService.remove.mockResolvedValue(deleted);

      const result = await controller.remove("1");

      expect(mockElectionService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleted);
    });
  });
});
