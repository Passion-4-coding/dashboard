export interface INavigationItemSimple {
  route: string;
  collapsedByDefault?: boolean;
  name: string;
}

export interface INavigationItem extends INavigationItemSimple {
  icon?: React.ReactNode | ((stroke: string) => JSX.Element);
}