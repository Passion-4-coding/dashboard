import { FC, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  onChange?: (data: string) => void;
  value?: string;
}

export const RichTextEditor: FC<Props> = ({ onChange, value }) => {
  const quillRef = useRef<ReactQuill>(null);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ align: ["right", "center", "justify"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "code-block"],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  function imageHandler() {
    if (!quillRef.current) return;

    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    const value = prompt("Please enter the image URL");

    if (value && range) {
      editor.insertEmbed(range.index, "image", value, "user");
    }
  }

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      defaultValue={value}
      onChange={onChange}
      modules={modules}
    />
  );
};
