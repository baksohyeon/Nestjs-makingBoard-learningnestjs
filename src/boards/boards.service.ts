import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { DeleteBoardDto } from './dto/delete-board.dto';
import { UpdateUserDto } from './dto/update-board.dto';
import { DeleteDateColumn } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  //Create
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = new Board(createBoardDto);
    return this.boardRepository.save(board);
  }

  // Read
  async getBoardByID(id: number): Promise<Board> {
    try {
      const found = await this.boardRepository.findOne(id);
      if (!found) {
        throw new NotFoundException(`There is no Board id ${id}`);
      }
      return found;
    } catch (e) {
      if (e.status === 404) {
        throw e;
      }
      throw new InternalServerErrorException('Server is down');
    }
  }

  async getAllBoards(): Promise<[Board[], number]> {
    return this.boardRepository.findAndCount();
  }

  // Update
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const selectedBoard = await this.getBoardByID(id);
    selectedBoard.status = status;
    return this.boardRepository.save(selectedBoard);
  }

  async updateContextById(
    id: number,
    updateRequest: UpdateUserDto,
  ): Promise<Board> {
    try {
      const toUpdateBoard = await this.getBoardByID(id);
      toUpdateBoard.title = updateRequest.title;
      toUpdateBoard.description = updateRequest.description;
      return await this.boardRepository.save(toUpdateBoard);
    } catch (e) {}
  } //에러잡기 주석 커넥션 타임 줄다보니까 타임아웃 - - - - -

  //Delete
  async deleteById(id: number): Promise<DeleteBoardDto> {
    try {
      const deleteResult = await this.boardRepository.delete(id);
      const affectedRow = deleteResult.affected;
      if (affectedRow === 0) {
        throw new NotFoundException('no corresponding ID is found');
      }
      return new DeleteBoardDto(affectedRow);
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Server encountered unknown error. Please contact to the service provider.',
      );
    }
  }
}
