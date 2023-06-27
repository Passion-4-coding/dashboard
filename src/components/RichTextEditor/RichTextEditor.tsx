import { FC } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Props {
  onChange?: (data: string) => void;
}

export const RichTextEditor: FC<Props> = ({ onChange }) => {
  const handleChange = (event: unknown, editor: ClassicEditor) => {
    if (onChange) {
      onChange(editor.getData());
    }
  };

  return <CKEditor editor={ClassicEditor} onChange={handleChange} />;
};
