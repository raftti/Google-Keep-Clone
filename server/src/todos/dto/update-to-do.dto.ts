import { IsOptional } from 'class-validator';

export class UpdateToDoDto {
  @IsOptional()
  readonly title: string;

  @IsOptional()
  readonly text: string;
}
