import { IsString, IsDateString } from "class-validator";

export class CreateCapsuleDto {
  @IsString()
  s3Key: string;

  @IsDateString()
  unlockDate: string;

  @IsString()
  email: string;

  @IsString()
  caption: string;

  @IsString()
  description: string;
}
