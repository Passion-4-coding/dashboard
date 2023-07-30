import { ApiStatuses, IPaginationProps } from "../../app/types";
import { IMember } from "../members";

export interface ITelegramMember {
  _id: string;
  memberId: IMember;
  discordId: string;
  tgname: string;
  active: boolean;
  createdOn: string;
  updatedOn: string;
}

export enum EKarmaType {
  Manual = "manual",
  Bump = "bump",
  Message = "message",
  SwearWord = "swear-word",
  ContentMaking = "content-making",
  Quiz = "quiz",
  Telegram = "telegram"
} 

export interface IKarmaEntry {
  _id: string;
  type: EKarmaType;
}

export interface IKarmaEntriesFilters {
  from: Date,
  to: Date,
  type: EKarmaType
}

export interface IKarmaSliceState {
  telegramMembers: ITelegramMember[];
  statusTelegramMembers: ApiStatuses;
  telegramMembersPagination: IPaginationProps;
  telegramMembersTotal: number;
  entries: IKarmaEntry[];
  statusEntries: ApiStatuses;
  entriesPagination: IPaginationProps;
  entriesTotal: number;
  entriesFilters: Partial<IKarmaEntriesFilters>;
}