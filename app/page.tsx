"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import CoverPics from '../public/codes.jpg'
import { userAuth } from "./components/auths/auth";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosTime } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { FaCommentAlt } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { BiRepost } from "react-icons/bi";
import { FullPost } from "./components/full post/fullPost";
import { PublishAPost } from "./components/publishAPost/publishAPost";
import { IoMdPhotos } from "react-icons/io";
import { MdVideoLibrary } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
export default function Home() {
  //const loggedInUser = userAuth();
  return (
    <main className="flex min-h-screen py-[20px] bg-slate-50 flex-col items-center  ">
      <div className="grid md:grid-cols-6 px-[30px] relative">
      <div></div>
        {/* SIDE BAR */}
        <div className="md:col-span-2  bg-white shadow-2xl fixed z-[1000] gap-2 top-[50px] w-[300px] bottom-[50px] w-[30%] top-0 md:right-[50px] right-[20px] rounded-[20px] p-2 py-[20px] flex flex-col justify-center">
          <ul className="flex flex-col gap-3 items-center ">
            <div className="flex flex-col border  rounded-[10px] py-[10px] px-[20px] items-center">
              <FaUserCircle className="text-[70px] bg-slate-50 rounded-full  " />
              <h1 className="text-[20px] font-bold">@Unknown Man</h1>
              <Link className="bg-sky-500  w-full text-center text-slate-50 rounded p-1" href=''>Complet Profile</Link>
            </div>
          <li className="text-slate-700 text-[20px] capitalize ">Home</li>
            <li className="text-slate-700 text-[20px] capitalize ">Friends</li>
            <li className="text-slate-700 text-[20px] capitalize ">Messages</li>
            <li className="text-slate-700 text-[20px] capitalize ">Make a post</li>
            <button className="flex text-[20px] mt-[20px] items-center"><IoMdLogOut /> <span className="text-slate-500">Logout</span></button>
          </ul>
        </div>
     
        <div className="md:col-span-3 flex max-w-[500px] flex-col gap-5">
          <div className="flex flex-col cursor-pointer gap-y-2 bg-white p-4 rounded">
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
          <div className="shadow-xl border bg-white  p-2 gap-[20px] rounded-[10px] flex-col flex">
            <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex items-center ">  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />@Nzubechukwu(B2R)</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">2nd March 2024</p>
            </div>
            <div className="">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <button type="button" className="font-bold">See More...</button>
            </div>
            <Image src={CoverPics} className="rounded-[10px] " alt="post pic" />
            <div className="flex items-center border-t border-b py-[5px] justify-around">
              <div className=" border-r flex items-center p-[5px] gap-x-[5px] "><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">20 Comments</p></div>
              <div className=" flex items-center p-[5px] gap-x-[5px] "><SlLike className="text-[20px] "/> <p className="text-slate-500">50 Likes</p></div>
              <div className=" flex items-center p-[5px] gap-x-[5px] border-l "><BiRepost className="text-[20px] " /><p className="text-slate-500">10 Repost</p></div>
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
