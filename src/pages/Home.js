
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"
import Post from "../component/Post";
import { dbService, storageService } from '../fbase';
const Home = ({ userObj }) => {
  console.log(userObj)
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [attachment, setAttachment] = useState() 
  const [file, setFile] = useState('')
  const [nweet, setNweet] = useState("");
  const onFileChange = (event) => {
    const {target:{files, value}} = event;
    const theFile = files[0];
    const reader = new FileReader();
    setFile(value)
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: {result}} = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment = () => {
    setAttachment(null)
    setFile('')
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection("posts")
      .add({ text: post, createdAt: Date.now(), creatorId: userObj.uid });
    setPost("");
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url")
      attachmentUrl = await response.ref.getDownloadURL()
    }
    const postObj = {
        text: post,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
    }
    await dbService.collection("posts").add(postObj);
    setNweet('');
    setAttachment('');
    setFile('')
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };
  useEffect(() => {
    dbService.collection("posts").onSnapshot((snapshot) => {
      const postArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArray);
    });
  }, []);
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={post} onChange={onChange} type="text" placeholder="게시글을 써주세요." maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} value={file}/>
        <input type="submit" value="제출하기" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="attachment"/>
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            postObj={post}
            isOwner={post.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;