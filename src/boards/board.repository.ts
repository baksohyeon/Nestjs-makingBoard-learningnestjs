import {
  AbstractRepository,
  DeleteResult,
  Entity,
  EntityRepository,
  Repository,
} from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board) //클래스를 커스텀된 저장소로 선언하는데 사용됨 (사용자 지정 저장소는 특정 엔티티 관리하거나 일반저장소일 수 있다)
export class BoardRepository extends AbstractRepository<Board> {
  async findOne(id: number): Promise<Board> {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async save(entity: Board): Promise<Board> {
    return this.repository.save(entity);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
// (Repository) this.save 구현체 -> (AbstractRepository) this.repository.save 인터페이스 (눌러서 보면 암 ~ 하위개념과 상위 개념임)

// board.module.ts
