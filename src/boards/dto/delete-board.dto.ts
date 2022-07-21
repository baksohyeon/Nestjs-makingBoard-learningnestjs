export class DeleteBoardDto {
  constructor(affectedRow: number) {
    this.affectedRow = affectedRow;
  }
  affectedRow: number;
}
