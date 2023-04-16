import { User } from 'src/user/entities/user.entity';
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetUser } from 'src/config/get-user.decorator';
import { AwsService } from './../services/aws.service';

@UseGuards(AuthGuard)
@Controller('aws-services')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}
  @Post('signed-url')
  async generateSignedUrl(
    @GetUser() user: User,
    @Body() body: { fileName: string },
  ) {
    const { url, key, signedUrl } = await this.awsService.generateSignUrl(
      user.id,
      body.fileName,
    );
    return { url, key, signedUrl };
  }
}
