import { Injectable } from '@nestjs/common';
import * as MTProto from '@mtproto/core';
import * as path from 'path';

@Injectable()
export class MtProtoService {
  private api_id = process.env.APP_API_ID;
  private api_hash = process.env.APP_API_HASH;

  mtProtoInstance = new MTProto({
    api_id: this.api_id,
    api_hash: this.api_hash,
    storageOptions: {
      path: path.resolve(__dirname, '../../data/auth.json'),
    },
  });
}
