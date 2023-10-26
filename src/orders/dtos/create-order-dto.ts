/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  client: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  address: string;
}