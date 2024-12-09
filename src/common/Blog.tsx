"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
export default function Blog() {
	const [editorValue, setEditorValue] = useState("");
	return <ReactQuill value={editorValue} onChange={setEditorValue} />;
}
