import { dbService, storageService } from '../fbase';
import React, { useState } from 'react';

const Post = ({ postObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newPost, setNewPost] = useState(postObj.text);
    //...
    const onDeleteClick = async () => {
      const ok = window.confirm("삭제하시겠습니까?");
      console.log(ok)
      if (ok) {
        await dbService.doc(`posts/${postObj.id}`).delete();
        await storageService.refFromURL(postObj.attachmentUrl).delete();
      }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
      event.preventDefault();
      await dbService.doc(`posts/${postObj.id}`).update({ text: newPost });
      setEditing(false);
    };
    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setNewPost(value);
    };
    return (
      <div>
        {editing ? (
          <> 
            <form onSubmit={onSubmit}>  
              <input
                onChange={onChange}
                type="text"
                value={newPost}
                required
              />
              <input type="submit" value="Update" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
        ) : (
          <>
            <h4>{postObj.text}</h4>
            {isOwner && (
              <>    
                <button onClick={onDeleteClick}>삭제</button>
                <button onClick={toggleEditing}>수정</button>
              </>
            )}
          </>
        )}
      </div>
    );
  };
  export default Post;