"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import CoverPics from '../public/codes.jpg'
import { userAuth } from "./components/auths/auth";
import { FaUserCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FaCommentAlt } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { BiRepost } from "react-icons/bi";
import { FullPost } from "./components/full post/fullPost";
import { PublishAPost } from "./components/publishAPost/publishAPost";
import { IoMdPhotos } from "react-icons/io";
import { MdVideoLibrary } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { TbSocial } from "react-icons/tb";
import { AllThePost } from "./allPosts/allPost";
export default function Home() {
  //const loggedInUser = userAuth();
  const allPost = AllThePost();
  const [showFullPost, setShowFullPost] = useState<boolean>(false)
  const [showPublishPost, setPublishPost] = useState<string>('hidden')
 
  const showFullPostFn = () => {
setShowFullPost(true)
  }

  return (
    <main className="flex min-h-screen pt-[100px] py-[20px] bg-slate-50 flex-col items-center  ">
   { showFullPost &&  <FullPost setShowFullPost={setShowFullPost} />}
     <PublishAPost displayPro={showPublishPost} setPublishPost={setPublishPost} />
      <div className="bg-white flex items-center justify-between gap-2 fixed px-[20px] py-[10px] z-[100] right-0 left-0 top-0 shadow border-b">
        <div className="flex items-center bg-blue-500 text-white py-[5px] px-[10px] rounded">
          <TbSocial className="text-[50px]"/>
          <h1 className="text-[15px] ">MYsocial</h1>
        </div>
       
          <input type="text" className="bg-slate-50 capitalize outline-none py-[18px] w-full  text-center text-[15px]" placeholder="search for a post here" name="" id="" />
      
      </div>
      <div className="grid md:grid-cols-6 px-[30px] relative">
      <div></div>
        {/* SIDE BAR */}
        <div className="md:col-span-2  bg-white shadow-2xl fixed z-[100] gap-2 top-[100px] w-[300px]  w-[30%]  md:right-[50px] right-[20px] rounded-[20px] p-2 py-[20px] hidden md:flex flex-col justify-center">
          <ul className="flex flex-col gap-3 items-center ">
            <div className="flex flex-col border  rounded-[10px] py-[10px] px-[20px] items-center">
              <FaUserCircle className="text-[70px] bg-slate-50 rounded-full  " />
              <h1 className="text-[20px] font-bold">@Unknown Man</h1>
              <Link className="bg-sky-500  w-full text-center text-slate-50 rounded p-1" href='/my-profile'>Complet Profile</Link>
            </div>
          <Link href='/' className="text-slate-700 text-[20px] capitalize ">Home</Link>
            <Link href='/users' className="text-slate-700 text-[20px] capitalize ">Friends</Link>
            <Link href='/chat' className="text-slate-700 text-[20px] capitalize ">Chats</Link>
            <Link href='' className="text-slate-700 text-[20px] capitalize ">Make a post</Link>
            <button className="flex text-[20px] mt-[20px] items-center"><IoMdLogOut /> <span className="text-slate-500">Logout</span></button>
          </ul>
        </div>
     
        <div className="md:col-span-3 flex max-w-[500px] flex-col gap-5">
          <div onClick={() => setPublishPost('block')} className="flex flex-col cursor-pointer gap-y-2 bg-white p-4 rounded">
            <div className="flex flex-row gap-x-[20px] items-center">
              <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />
              <div className="text-slate-500 p-3 border w-full rounded-[10px]">Write a post here...</div>
            </div>
            <hr />
            <div className="flex flex-row gap-5  w-full justify-around">
              <div className="flex items-center gap-1 text-slate-700  bg-slate-50 p-2 rounded"><IoMdPhotos /><span>Photo</span></div>
              <div className="flex items-center gap-1 text-slate-700 bg-slate-50 p-2 rounded"><MdVideoLibrary /><span>Video</span></div>
              <button className="bg-sky-500 text-slate-50 p-2 rounded">Publish Post</button>
            </div>
          </div>
          {
            allPost.map(post => {
              return    <div key={post.postId} className="shadow-xl border bg-white  p-2 gap-[20px] rounded-[10px] flex-col flex">
              <div className="flex gap-1 flex-row items-center">
                  <h1 className="font-bold flex items-center ">  {post.authorPics !== '' ? <Image src={post.authorPics} height={50} width={50} className="rounded-full " alt="post pic" /> :  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full capitalise shadow-2xl " />}@{post.authorName}</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">{post.postsDate}</p>
              </div>
              <div className="">
                  <p>{post.postsContent}</p>
              <button onClick={showFullPostFn} type="button" className="font-bold">See More...</button>
              </div>
              <Image src={post.postImg} width={500} height={300} className="rounded-[10px] " alt="post pic" />
              <div className="flex items-center border-t border-b py-[5px] justify-around">
                <div onClick={showFullPostFn} className=" border-r flex items-center cursor-pointer p-[5px] gap-x-[5px] "><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">{post.postComment} Comments</p></div>
                <div className=" flex items-center p-[5px] cursor-pointer gap-x-[5px] "><SlLike className="text-[20px] "/> <p className="text-slate-500">{post.postLike} Likes</p></div>
                <div className=" flex items-center p-[5px] cursor-pointer gap-x-[5px] border-l "><BiRepost className="text-[20px] " /><p className="text-slate-500">{post.postRepost} Repost</p></div>
              </div>
            
                <div className="py-[10px] w-full bg-slate-50 flex items-center justify-around px-[20px] gap-1">
                  <input type="text" placeholder="Input your comment" className="w-full outline-none bg-transparent" />
                  <button type="button" className="bg-sky-500 p-2 rounded text-slate-50">Comment</button>
                </div>
             
            </div>
            })
          }
          <div className="shadow-xl border bg-white  p-2 gap-[20px] rounded-[10px] flex-col flex">
            <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex items-center ">  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />@Nzubechukwu(B2R)</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">2nd March 2024</p>
            </div>
            <div className="">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <button onClick={showFullPostFn} type="button" className="font-bold">See More...</button>
            </div>
            <Image src={CoverPics} className="rounded-[10px] " alt="post pic" />
            <div className="flex items-center border-t border-b py-[5px] justify-around">
              <div onClick={showFullPostFn} className=" border-r flex items-center cursor-pointer p-[5px] gap-x-[5px] "><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">20 Comments</p></div>
              <div className=" flex items-center p-[5px] cursor-pointer gap-x-[5px] "><SlLike className="text-[20px] "/> <p className="text-slate-500">50 Likes</p></div>
              <div className=" flex items-center p-[5px] cursor-pointer gap-x-[5px] border-l "><BiRepost className="text-[20px] " /><p className="text-slate-500">10 Repost</p></div>
            </div>
          
              <div className="py-[10px] w-full bg-slate-50 flex items-center justify-around px-[20px] gap-1">
                <input type="text" placeholder="Input your comment" className="w-full outline-none bg-transparent" />
                <button type="button" className="bg-sky-500 p-2 rounded text-slate-50">Comment</button>
              </div>
           
          </div>
        </div>
        </div>
    </main>
  );
}
