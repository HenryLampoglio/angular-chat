export interface UserSummary {
  id: string;
  nickname: string;
  publicIdentificationKey: number;
  userQuote: string | null;
}

export interface ConnectionItem {
  connectionId: string;
  connectionStatus: string;
  userData: UserSummary;
}

export interface PaginationResponse<T> {
  items: T[];
  page: number;
  totalPages: number;
}

export interface ConnectionInviteAccept{
  connectionId: string;
  createdAt: string;
  updatedAt: string;
  connectionStatus: string;
}