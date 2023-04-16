import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
  client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    },
  });

  async generateSignUrl(userId: string, fileName) {
    const key = fileName
      ? fileName
      : userId + '/' + new Date().toISOString() + '.png';
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: key,
    });
    const signedUrl = await getSignedUrl(this.client, command, {
      expiresIn: 3600,
    });
    return {
      signedUrl,
      key,
      url: process.env.AWS_CLOUDFRONT_AWS_BUCKET + '/' + key,
    };
  }

  async generateKey(url) {
    const all = url.split('/');
    const [, , , ...rest] = all;
    const path = rest.join('/');
    const [name, extension] = path.split('.');
    return { extension, name };
  }
}
