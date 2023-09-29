import { FC, useEffect, useState } from "react";
import { Select, SelectProps, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { fetchMembersForSelection } from "../slice";
import { ApiStatuses } from "../../../app/types";

interface Props extends SelectProps<{ value: string; label: string }> {
  valueOption?: { value: string; label: string };
}

export const SelectMember: FC<Props> = ({ valueOption, ...rest }) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const dispatch = useDispatch<AppDispatch>();
  const { membersForSelection, membersForSelectionStatus } = useSelector(
    (state: RootState) => {
      return state.members;
    }
  );

  const handleSearch = (search: string) => {
    if (search.length < 3) return;
    dispatch(fetchMembersForSelection({ search }));
  };

  useEffect(() => {
    const updatedOptions = membersForSelection.map((member) => ({
      value: member._id,
      label: member.username,
    }));
    setOptions(updatedOptions);
  }, [membersForSelection]);

  useEffect(() => {
    if (!valueOption || options.find((o) => o.value === valueOption.value))
      return;
    setOptions([...options, valueOption]);
  }, [valueOption, options]);

  return (
    <Select
      showSearch
      placeholder="Start typing"
      filterOption={false}
      notFoundContent={
        membersForSelectionStatus === ApiStatuses.loading ? (
          <Spin size="small" />
        ) : null
      }
      onSearch={handleSearch}
      options={options}
      {...rest}
    />
  );
};
