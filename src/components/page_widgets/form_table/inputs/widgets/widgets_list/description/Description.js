import React, { useState } from 'react'
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function Description({ 
  value,
  name,
  updateValue,
  label,

}) {
  let currentValue = value || ''
  if (currentValue == null) {
    currentValue = ''
  }

  const contentDataState = ContentState.createFromBlockArray(convertFromHTML(currentValue))
  const editorDataState = EditorState.createWithContent(contentDataState);
  const [editorState, setEditorState] = useState(editorDataState) 



  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  };

  const onDataChange = (event) => {
    updateValue(name, draftToHtml(event), null, null)
  };


  return (
    <>
      <label class="fw-bold form-label">{label || ''}</label>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName mt-2"
        editorClassName="editorClassName border h-400px"
        onEditorStateChange={onEditorStateChange}
        onChange={onDataChange}
      />
    </>
  )

}
export default Description