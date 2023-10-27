import { IsOptional } from 'class-validator';

export class CreateToDoDto {
  @IsOptional()
  readonly title: string;

  @IsOptional()
  readonly text: string;

  @IsOptional()
  readonly userId: string;
}
