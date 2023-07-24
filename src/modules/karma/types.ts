import { ApiStatuses, IPaginationProps } from "../../app/types";
import { IMember } from "../member";

export interface ITelegramMember {
  _id: string;
  memberId: IMember;
  discordId: string;
  tgname: string;
  active: boolean;
  createdOn: string;
  updatedOn: string;
}

export interface IKarmaSliceState {
  telegramMembers: ITelegramMember[];
  statusTelegramMembers: ApiStatuses;
  telegramMembersPagination: IPaginationProps;
  telegramMembersTotal: number;
}