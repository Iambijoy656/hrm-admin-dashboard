"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import { MdOutlineFormatBold, MdOutlineFormatUnderlined } from "react-icons/md";
import { BsListOl, BsQuote, BsTypeItalic } from "react-icons/bs";
import { TbStrikethrough } from "react-icons/tb";
import { LuHeading2 } from "react-icons/lu";
import { IoListOutline } from "react-icons/io5";
import { IoMdCode } from "react-icons/io";
import { CgRedo, CgUndo } from "react-icons/cg";
import { Box, Button } from "@mui/material";

type Props = {
  editor: Editor | null | any;
  content: string;
};

export default function Toolbar({ editor, content }: Props) {
  if (!editor) {
    return null;
  }
  return (
    <Box
      //       className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
      // gap-5 w-full flex-wrap border border-gray-700"
      sx={{
        px: 1,
        py: 0.5,
        border: "1px solid #C6C6C6",
        borderRadius: "5px 5px 0 0",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        sx={{
          color: "#000",
          fontSize: 18,
          border: "1px solid #C6C6C6",
          minWidth: "35px",
          backgroundColor: editor.isActive("bold") ? "#b2b2b2" : "#f1f1f1",
        }}
      >
        <MdOutlineFormatBold />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        sx={{
          color: "#000",
          fontSize: 18,
          border: "1px solid #C6C6C6",
          minWidth: "35px",
          backgroundColor: editor.isActive("italic") ? "#b2b2b2" : "#f1f1f1",
        }}
      >
        <BsTypeItalic />
      </Button>
      {/* <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderlined().run();
        }}
        sx={{
          color: "#000",
          fontSize: 18,
          border: "1px solid #C6C6C6",
          minWidth: "35px",
          backgroundColor: editor.isActive("underline") ? "#C6C6C6" : "#f1f1f1",
        }}
      >
        <MdOutlineFormatUnderlined />
      </Button> */}
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        sx={{
          color: "#000",
          fontSize: 18,
          border: "1px solid #C6C6C6",
          minWidth: "35px",
          backgroundColor: editor.isActive("strike") ? "#b2b2b2" : "#f1f1f1",
        }}
      >
        <TbStrikethrough />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        sx={{
          color: "#000",
          fontSize: 18,
          border: "1px solid #C6C6C6",
          minWidth: "35px",
          backgroundColor: editor.isActive("heading", { level: 2 }) ? "#b2b2b2" : "#f1f1f1",
        }}
      >
        <LuHeading2 />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        sx={{
          color: "#000",
          fontSize: 18,
          border: "1px solid #C6C6C6",
          minWidth: "35px",
          backgroundColor: editor.isActive("bulletList") ? "#b2b2b2" : "#f1f1f1",
        }}
      >
        <IoListOutline />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        sx={{
          color: "#000",
          fontSize: 18,
          border: "1px solid #C6C6C6",
          minWidth: "35px",
          backgroundColor: editor.isActive("orderedList") ? "#b2b2b2" : "#f1f1f1",
        }}
      >
        <BsListOl />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
        }}
        sx={{
          color: "#000",
          fontSize: 18,
          border: "1px solid #C6C6C6",
          minWidth: "35px",
          backgroundColor: editor.isActive("blockquote") ? "#b2b2b2" : "#f1f1f1",
        }}
      >
        <BsQuote />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setCode().run();
        }}
        sx={{
          color: "#000",
          fontSize: 18,
          border: "1px solid #C6C6C6",
          minWidth: "35px",
          backgroundColor: editor.isActive("code") ? "#b2b2b2" : "#f1f1f1",
        }}
      >
        <IoMdCode />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        sx={{
          color: "#000",
          fontSize: 18,
          border: "1px solid #C6C6C6",
          minWidth: "35px",
          backgroundColor: editor.isActive("undo") ? "#b2b2b2" : "#f1f1f1",
        }}
      >
        <CgUndo />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        sx={{
          color: "#000",
          fontSize: 18,
          border: "1px solid #C6C6C6",
          minWidth: "35px",
          backgroundColor: editor.isActive("redo") ? "#b2b2b2" : "#f1f1f1",
        }}
      >
        <CgRedo />
      </Button>
    </Box>
  );
}
