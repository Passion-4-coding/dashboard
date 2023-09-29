import { FC } from "react";
import { ApiStatuses } from "../../app/types";
import { Loader } from "./Loader";

interface Props {
  status: ApiStatuses;
  children: JSX.Element;
}

export const LoaderWrapper: FC<Props> = ({ children, status }) => {
  if (status === ApiStatuses.loading || status === ApiStatuses.initial) {
    return <Loader />;
  }
  return children;
};
