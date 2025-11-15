import { Test, TestingModule } from '@nestjs/testing';
import { NanoIdService } from 'src/common/services/nanoIdService';
import { PrismaService } from 'src/database/prisma.service';

import { ElectionService } from './election.service';

jest.mock("nanoid", () => ({
  customAlphabet: () => () => "MOCK_ID",
}));

// Mocks
const mockPrismaService = {
  election: {
    findFirstOrThrow: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  token: {
    createMany: jest.fn(),
  },
  vote: {
    groupBy: jest.fn(),
  },
  electoralSlate: {
    findUnique: jest.fn(),
  },
};

const mockNanoIdService = {
  generateId: jest.fn(() => 'FAKE_ID'),
  generateToken8: jest.fn(() => 'FAKE_TOKEN'),
};

describe('ElectionService', () => {
  let service: ElectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElectionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService
        },
        {
          provide: NanoIdService,
          useValue: mockNanoIdService
        }
      ],
    }).compile();

    service = module.get<ElectionService>(ElectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("findOne()", () => {
    it("should return one election by ID", async () => {
      const mockElection = { id: 2, title: "Eleição 2" };

      mockPrismaService.election.findFirstOrThrow.mockResolvedValue(mockElection);

      const result = await service.findOne(2);

      expect(result).toEqual(mockElection);
      expect(mockPrismaService.election.findFirstOrThrow).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.election.findFirstOrThrow).toHaveBeenCalledWith({
        where: { id: 2 },
      });
    });
  });

  describe("findAll()", () => {
    it("should return all elections when list is not empty", async () => {
      const mockElections = [
        { id: 1, title: "Eleição 1" },
        { id: 2, title: "Eleição 2" },
      ];

      mockPrismaService.election.findMany.mockResolvedValue(mockElections);

      const result = await service.findAll();

      expect(result).toEqual(mockElections);
      expect(mockPrismaService.election.findMany).toHaveBeenCalledTimes(1);
    });
  });


});
