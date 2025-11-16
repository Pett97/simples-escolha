import { Test, TestingModule } from '@nestjs/testing';
import { NanoIdService } from 'src/common/services/nanoIdService';
import { PrismaService } from 'src/database/prisma.service';

import { ElectionService } from './election.service';
import { NotFoundException } from '@nestjs/common';

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
    jest.clearAllMocks();
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

    it("should throw NotFoundException when election does not exist", async () => {
      mockPrismaService.election.findFirstOrThrow.mockRejectedValue(new NotFoundException());

      await expect(service.findOne(3)).rejects.toThrow(NotFoundException);
      expect(mockPrismaService.election.findFirstOrThrow).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.election.findFirstOrThrow).toHaveBeenCalledWith({
        where: { id: 3 },
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

    it("should return a empty array when list is empty", async () => {
      const mockElection = [];

      mockPrismaService.election.findMany.mockResolvedValue(mockElection);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
      expect(mockPrismaService.election.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('create()', () => {
    it("can be create a wonderfull election", async () => {
      const dto = { votingDate: new Date("2025-05-05"), maxVote: 250 };

      const createdElection = {
        id: 1,
        ...dto,
      };

      mockPrismaService.election.create.mockResolvedValue(createdElection);

      const result = await service.create(dto);

      expect(mockPrismaService.election.create).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.election.create).toHaveBeenCalledWith({
        data: dto,
      });

      expect(result).toEqual(createdElection);
    });

  });

  describe("update()", () => {
    it("should update an election successfully", async () => {
      const dto = { votingDate: new Date("2025-10-10"), maxVote: 500 };

      const updatedElection = {
        id: 1,
        ...dto,
      };

      mockPrismaService.election.update.mockResolvedValue(updatedElection);

      const result = await service.update(1, dto);

      expect(mockPrismaService.election.update).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.election.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });

      expect(result).toEqual(updatedElection);
    });
  });

  describe("delete()", () => {
    it("should delete an election successfully", async () => {
      const deletedElection = {
        id: 1,
        votingDate: new Date("2025-05-05"),
        maxVote: 250,
      };

      mockPrismaService.election.delete.mockResolvedValue(deletedElection);

      const result = await service.remove(1);

      expect(mockPrismaService.election.delete).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.election.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      expect(result).toEqual(deletedElection);
    });
  });


});
