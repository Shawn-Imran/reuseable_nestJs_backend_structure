import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;  // Default to page 1

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;  // Default to limit 10
}

export class Pagination<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}