"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

type TiptapProps = {
  content: string;
  onChange: () => void;
};

export default function Tiptap({ onChange, content }: TiptapProps) {
  const handleChange = (newContent: string) => {};
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        style: "height: 100px; width: 100%; border:1px solid #000; border-radius:5x;",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div>
      <Toolbar editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
}
