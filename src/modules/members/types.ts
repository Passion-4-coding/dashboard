import { ApiStatuses, IPaginationProps } from "../../app/types";

export interface IMember {
  _id: string;
  discordId: string;
  id: string;
  isActive: boolean;
  isBot: boolean;
  isTest: boolean;
  karma: number;
  username: string;
}

export interface IMembersListFilters {
  memberId: string;
}

export interface IMembersSliceState {
  list: IMember[];
  status: ApiStatuses;
  pagination: IPaginationProps;
  total: number;
  filters: Partial<IMembersListFilters>;
  membersForSelection: IMember[];
  membersForSelectionStatus: ApiStatuses;
}