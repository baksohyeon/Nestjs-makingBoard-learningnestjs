import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
@Entity()
export class Board extends BaseEntity {
  constructor(createBoardDto?: CreateBoardDto) {
    super();
    if (!createBoardDto) {
      return;
    }
    this.title = createBoardDto.title;
    this.description = createBoardDto.description;
    this.status = BoardStatus.PUBLIC;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: '255' })
  status: BoardStatus;
}
