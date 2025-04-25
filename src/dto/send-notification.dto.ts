import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SendNotificationDto {
    @ApiProperty()
    @IsString()
    to: string;
}