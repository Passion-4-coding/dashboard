import { EKarmaType } from "./types";

export const getKarmaTypesFilterItems = () => [
  {
    value: EKarmaType.Manual,
    label: "Manual",
  },
  {
    value: EKarmaType.Message,
    label: "Message",
  },
  {
    value: EKarmaType.Bump,
    label: "Bump",
  },
  {
    value: EKarmaType.SwearWord,
    label: "Swear Word",
  },
  {
    value: EKarmaType.ContentMaking,
    label: "Content making",
  },
  {
    value: EKarmaType.Telegram,
    label: "Telegram",
  },
  {
    value: EKarmaType.Quiz,
    label: "Quiz",
  },
]