import { FC, useEffect, useState } from "react";
import { Select, SelectProps, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { fetchATagsForSearch } from "../slice";
import { ApiStatuses } from "../../../app/types";

export const SelectTag: FC<SelectProps<{ value: string; label: string }>> = (
  props
) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const dispatch = useDispatch<AppDispatch>();
  const { tagsForSearch, tagsForSearchStatus } = useSelector(
    (state: RootState) => {
      return state.articles;
    }
  );

  const handleSearch = (search: string) => {
    if (search.length < 3) return;
    dispatch(fetchATagsForSearch(search));
  };

  useEffect(() => {
    dispatch(fetchATagsForSearch(""));
  }, [dispatch]);

  useEffect(() => {
    const updatedOptions = tagsForSearch.map((tag) => ({
      value: tag._id,
      label: tag.name,
    }));
    setOptions(updatedOptions);
  }, [tagsForSearch]);

  return (
    <Select
      mode="multiple"
      showSearch
      placeholder="Start typing"
      filterOption={false}
      notFoundContent={
        tagsForSearchStatus === ApiStatuses.loading ? (
          <Spin size="small" />
        ) : null
      }
      onSearch={handleSearch}
      options={options}
      {...props}
    />
  );
};
