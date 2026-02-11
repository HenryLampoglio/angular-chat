export interface UserSummary {
  id: string;
  nickname: string;
  publicIdentificationKey: number;
  userQuote: string | null;
}

export interface ConnectionItem {
  connectionId: string;
  connectionStatus: string;
  receiverData: UserSummary;
}

export interface PaginationResponse<T> {
  items: T[];
  page: number;
  totalPages: number;
}
