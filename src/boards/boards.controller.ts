import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { DeleteBoardDto } from './dto/delete-board.dto';
import { UpdateUserDto } from './dto/update-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  // create
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  // read
  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardService.getBoardByID(id);
  }

  @Get()
  getAllBoards(): Promise<[Board[], number]> {
    return this.boardService.getAllBoards();
  }

  // Update
  @Patch('/:id/status')
  async updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardStatus(id, status);
  }

  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  async updateBoardContext(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequest: UpdateUserDto,
  ) {
    return this.boardService.updateContextById(id, updateRequest);
  }

  // Delete
  @Delete('/:id')
  async deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteBoardDto> {
    return this.boardService.deleteById(id);
  }
}
