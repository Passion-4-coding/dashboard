import { ApiStatuses, Nullable } from "../../app/types";
import { EScopes } from "../casl";

export interface IAuthUser {
  id: string;
  username: string;
  avatar: string;
  scopes: EScopes[];
}

export interface IAuthSliceState {
  user: Nullable<IAuthUser>;
  status: ApiStatuses;
}
