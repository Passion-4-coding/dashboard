import { Select, Space } from "antd";
import { DatePicker } from "../../../components/DatePicker";
import { RangeValue } from "rc-picker/lib/interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { actions } from "../slice";
import styles from "./KarmaEntriesFilters.module.css";
import { getKarmaTypesFilterItems } from "../utils";
import { EKarmaType } from "../types";

const { RangePicker } = DatePicker;

export const KarmaEntriesFilters = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDateRangeChange = (dates: RangeValue<Date>) => {
    if (!dates || !dates[0] || !dates[1]) return;
    dispatch(actions.setKarmaEntriesFilters({ from: dates[0], to: dates[1] }));
  };

  const handleKarmaTypeChange = (type: EKarmaType) => {
    dispatch(actions.setKarmaEntriesFilters({ type }));
  };

  const items = getKarmaTypesFilterItems();

  return (
    <Space direction="horizontal" size={12} className={styles.container}>
      <RangePicker showTime onChange={handleDateRangeChange} />
      <Select
        showSearch
        style={{ width: 200 }}
        onChange={handleKarmaTypeChange}
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        placeholder="Search karma type"
        optionFilterProp="children"
        options={items}
      />
    </Space>
  );
};
