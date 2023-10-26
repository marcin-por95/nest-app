/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  Length,
  IsUUID,
} from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @Length(10, 20)
  @IsUUID()
  client: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

}