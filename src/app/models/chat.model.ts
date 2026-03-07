import { UUID } from 'crypto';

export interface IChat {
  id: UUID;
  chatType?: ChatType;
  chatName?: string;
  chatAccessType?: ChatAccessType;
  description?: string;
  createdBy?: UUID;
  createdAt: Date;
}

export enum ChatType {
  PERSONAL = 'PERSONAL',
  GROUP = 'GRUP',
}

export enum ChatAccessType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  INVITE_ONLY = 'INVITE_ONLY',
}
