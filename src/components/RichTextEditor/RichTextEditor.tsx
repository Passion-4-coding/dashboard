import { FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  onChange?: (data: string) => void;
  value?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "code-block"],
  ],
};

export const RichTextEditor: FC<Props> = ({ onChange, value }) => {
  return <ReactQuill value={value} onChange={onChange} modules={modules} />;
};
