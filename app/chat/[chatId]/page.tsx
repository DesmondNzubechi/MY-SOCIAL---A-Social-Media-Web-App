"use client";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RiImageAddFill } from "react-icons/ri";
import Login from "@/app/login/page";
import { userAuth } from "@/app/components/auths/auth";
import { AllUser } from "@/app/components/allUser/allUser";
import { collection, doc, onSnapshot,  updateDoc} from "firebase/firestore";
import { db, storage } from "@/app/components/config/firebase";
import { fullDate } from "@/app/components/publishAPost/publishAPost";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { userInfo } from "os";
import ChatSkeletonLoader from "@/app/components/SkeletonLoader/ChatSkeleton";
import { ConversationSkeletonLoader } from "@/app/components/SkeletonLoader/conversationSkeleton";

interface userInfo  { 
    userID: string,
    username: string,
    useremail: string, 
    userPic: string
}

interface messageInfo {
    senderId: string | undefined,
    senderName: string | undefined | null,
    messageTitle: string,
    time: any,
    messageImg: string,
   
}
interface User {
    userID: string,
    fullname: string,
    useremail: string,
    userPic: string,
    coverPic: string,
    username: string,
    bio: string,
    location: string,
    favorite: string,
    dateJoined: string
}
const User = ({ params }: { params: { chatId: string } }) => {

    const { chatId } = params; // Access the correct parameter name
    const user = userAuth();
    const allUser = AllUser();
    const [currentUser, setCurrentUser] = useState<User>({
        userID: "",
        fullname: "",
        useremail: "",
        userPic:"",
        coverPic: "",
        username: "",
        bio: "",
        location: "",
        favorite: "",
        dateJoined: ''
      }); 
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const [currentChat, setCurrentChat] = useState<any>([])
    const [userInfoState, setUserInfoState] = useState<userInfo>({
        userID: '',
        username: '',
        useremail: '',
        userPic: '',
    });
const [message, setMesage] = useState<messageInfo>({
    senderId: '',
    senderName: '',
    messageTitle: '',
    time: fullDate,
  messageImg: '',
})



 
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({behavior: "smooth"})
        }
    }, [currentChat.message])
    console.log("user information", user);
    
    const combinedId = currentUser.userID > params.chatId ?
        user?.uid + params.chatId :
        params.chatId + user?.uid;
   
    useEffect(() => {
        const filterUser = () => {
            const findUser = allUser.find((theUser: userInfo) => params.chatId.includes(theUser.userID) && theUser.userID !== user?.uid);
            setUserInfoState(findUser);
            console.log("find user",  findUser)
        };
        
      filterUser()
    }, [chatId, allUser, params.chatId])
    

    useEffect(() => {
        const getCurrentUser = () => {
            const currentUser = allUser.find((cUser: any) => {
            return cUser.userID === user?.uid
            })
            setCurrentUser({ ...currentUser })
          
        }
       
            getCurrentUser();
       
    }, [allUser])


    useEffect(() => {
        const chatStore = doc(db, 'chats', params.chatId);
       // console.log('combine id', combinedId);

        const unsubscribe = onSnapshot(chatStore, (theChatSnapshot) => {
            try {
                // Check if the document exists before accessing data
                if (theChatSnapshot.exists()) {
                    const theChat = theChatSnapshot.data();
                    setCurrentChat(theChat); // Use an array if you are storing multiple chat documents
                    console.log('current chat', currentChat);
                } else {
                    // Handle case where the document doesn't exist
                    console.log('Chat document does not exist');
                }
            } catch (error) {
                console.error('Error processing chat snapshot:', error);
            }
        });

        return () => unsubscribe();
    }, [combinedId, params.chatId, message.messageTitle]);

 const [sendingMessageStatus, setSendingMessageStatus] = useState<boolean>(false)

    
    const sendAMessage = async () => {
        if (message.messageTitle === '') {
            toast.info("Please input your message", {
                hideProgressBar: true,
                position: "top-center"
            })
            return;
        }
        setSendingMessageStatus(true)
        try {
            const chatRef = doc(db, 'chats', params.chatId);
            await updateDoc(chatRef, {
                firstUser: currentUser,
                secondUser: userInfoState ,
            message: [...currentChat?.message, message],
            lastMessage: { message: message.messageTitle, messageDate: fullDate, messageId:uuid() }
        })
        setMesage({
            senderId: '',
        senderName: '',
        messageTitle: '',
        time: fullDate,
            messageImg: '',
        })
            setSendingMessageStatus(false)
        
        } catch (error) {
            setSendingMessageStatus(false)
           
        }
        
    }

    
    
   
    const [viewProfile, setViewprofile] = useState(false);
    const [dp, setDp] = useState<any>(null);
   
    const [allTheChat, setAllTheChat] = useState<any>([])

    
    useEffect(() => {
        const chatRef = collection(db, 'chats');
        const Unsub = onSnapshot(chatRef, (snapShot) => {
        let chats = snapShot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setAllTheChat(chats)
        })

        return () => Unsub();
    }, [])
    
    const [myChats, setMyChats] = useState<any>([])
    useEffect(() => {
        const filterMyChat = allTheChat.filter((myChat:any) => {
            return myChat.id.includes(user?.uid)
        })
        setMyChats(filterMyChat)
    }, [allTheChat])
    
    const [chatImg, setChatImg] = useState<File | any>(null);

    const sendChatImage = async () => {
        setSendingMessageStatus(true);
        try {
            const chatImgRef = ref(storage, "chat images");
            const chatImgname = ref(chatImgRef, `${uuid()} chat image ${chatImg.name}`)
          const uploadChatImg =  await uploadBytes(chatImgname, chatImg);
            const getChatImgURL = await getDownloadURL(uploadChatImg.ref);
            const chatRef = doc(db, "chats", params.chatId);
            await updateDoc(chatRef, {
                firstUser: currentUser,
                secondUser: userInfoState ,
                message: [...currentChat?.message,
                    {
                        messageImg: getChatImgURL,
                        messageTitle: '',
                        senderId: user?.uid,
                        senderName: user?.displayName,
                        time: fullDate,
                    }
                ],
                lastMessage: { message: "An Image", messageDate: fullDate, messageId:uuid() }
            })
            setSendingMessageStatus(false)
           
        } catch (error) {
            setSendingMessageStatus(false);
           
        }
    }

    useEffect(() => {
        if (chatImg !== null) {
            sendChatImage()
        }
    }, [chatImg])
    
    
    return (
       
            !user? <Login/>:
        <div className=" fixed w-full top-[70px] flex flex-row items-start gap-5  justify-around">
         
         {userInfoState ? <div className="md:flex hidden flex-col h-[100vh] w-full overflow-y-scroll gap-5 px-[10px] py-[20px] pt-[100px] pb-[50px]  bg-slate-100 items-center ">
                        <h1 className="uppercase text-[30px] text-center font-bold">all the chats</h1>
                        <div className="flex items-center  w-full self-start justify-center gap-5 ">
                           
                           
                            {/* <button onClick={() => logOutUser()} className="bg-red-500 p-1 text-slate-50 px-[20px] rounded text-[20px] font-medium">Logout</button> */}
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center  border px-5 border-[2px] bg-slate-100 gap-1 rounded-[10px] justify-center">
                                <input type="search" name="" className="outline-none w-full bg-transparent p-2" placeholder="Serach for messages" id="" />
                                <IoMdSearch />
                            </div>
                            <div className="flex w-full flex-col gap-5">
                              
                                {
                                    myChats?.map((chat:any) => {
                                        return <><Link   key={chat?.lastMessage?.messageId} href={`/chat/${chat?.id}`} className="flex w-full gap-2 items-center">
                                        {(chat.secondUser.userPic !== '' && chat.firstUser.userPic !== '')? <Image alt='user pic' width={50} height={30} className="rounded-full h-[50px]" src={chat?.firstUser.userID === currentUser.userID ? chat?.secondUser?.userPic : chat?.firstUser?.userPic} /> :
                                                
                                                <FaUserCircle className="text-[40px] " />}
                                        <div className="flex flex-col gap-[5px]">
                                            <div className="flex items-center flex-row gap-2">
                                                    <h1 className="text-slate-900 text-[15px] uppercase font-bold font-semibold">{chat?.firstUser.userID === currentUser.userID ? chat?.secondUser?.username : chat?.firstUser?.username}</h1> <p className="text-slate-500 italic text-[15px]">{chat?.lastMessage?.messageDate}</p>
                                                </div>  
                                           <div>
                                                    <p className="text-slate-500 text-[15px]">{chat?.lastMessage?.message}</p>
                                            </div>
                                            </div>
                                        </Link>
                                            <hr />
                                            </>
                                    })
                                }
                            </div>
                        </div>
                    </div> : <ChatSkeletonLoader/> }
            {userInfoState? <div className="flex flex-col overflow-y-auto overflow-x-hidden h-[100vh] gap-y-[50px] px-[20px] relative bg-contain pt-[50px] justify-around w-full ">
                <div className="right-0 left-0 md:left-[48.8%] right-0 md:right-[0%] px-[20px] flex  items-center justify-between top-[55px] md:top-[80px]  gap-3 p-2 rounded fixed bg-slate-100 top-0">
              <Link className="flex gap-2 items-center" href={`/users/${userInfoState?.userID}`}>
                   {userInfoState?.userPic ? <Image alt={userInfoState?.username} width={50} height={30} className="rounded-full h-[50px]" src={userInfoState?.userPic} /> : <FaUserCircle className="text-[50px] " />}
                        <h1 className="uppercase font-medium text-[20px] ">{ userInfoState?.username}</h1>
                    </Link>
                    <HiDotsHorizontal className="border text-[30px] border-slate-900 p-1  rounded-full " />
                  
                     { viewProfile &&  <Link href="" className="text-slate-900 bg-white  fixed top-[50px] font-medium px-[20px] py-[30px] shadow-2xl rounded  right-0">View Profile</Link>}
                 
           </div>
                <div className="flex  pb-[160px] pt-[50px]  items-center flex-col gap-y-[50px]">
                    {
                        currentChat?.message?.map((chats: messageInfo) => {
                            return <div  ref={(el) => (lastMessageRef.current = el)} className={`flex items-center ${chats?.senderId !== user?.uid? "self-start" : "self-end" }   ${chats?.senderId !== user?.uid? "flex-row" : "flex-row-reverse" }  gap-2`}>
                                {chats?.senderId === userInfoState?.userID && (userInfoState?.userPic ? <Link href={`/users/${userInfoState?.userID}`}> <Image alt={userInfoState?.username} width={50} height={30} className="rounded-full h-[50px]" src={userInfoState?.userPic} /></Link> : <Link href={`/users/${userInfoState?.userID}`}><FaUserCircle className="text-[50px] " /></Link>)}
                                {chats?.senderId !== userInfoState?.userID &&  (currentUser.userPic ? <Link href='/my-profile'> <Image alt={currentUser?.username} width={50} height={30} className="rounded-full h-[50px]" src={currentUser?.userPic} /></Link> : <Link href='/my-profile'><FaUserCircle className="text-[50px] " /></Link>)}
                                {chats.messageTitle !== '' && <p className={` ${chats?.senderId !== user?.uid ? ' p-[15px] bg-slate-500 text-[15px] text-white rounded-tl-[10px] rounded-r-[15px]' : "p-[15px] bg-sky-500 text-[15px] text-white rounded-tr-[10px] rounded-l-[15px] "} `}>{chats?.messageTitle}</p> }
                               {chats.messageImg !== '' && <Image alt="" width={200} height={200} className="w-[200px] shadow-2xl rounded " src={chats?.messageImg} /> }
                             </div>
                        })
                }
                   
                </div>
                
                <form action="" onSubmit={(e) => {
                    e.preventDefault()
                    sendAMessage();
                }} className="left-0 md:left-[48.8%] right-0 md:right-[0%]  flex gap-2 right-0 items-center p-2 rounded fixed bg-slate-100 bottom-0">
                    <input type="text"  onChange={(e) => {
                        e.preventDefault();
                        setMesage({
                            messageTitle: e.target.value,
                            senderId: user?.uid,
                            senderName: user?.displayName,
                            time: fullDate,
                            messageImg: ''
                        })
                    }} name="" value={message.messageTitle} placeholder="Write you message here" className=" py-[10px] text-[20px] bg-transparent outline-none  w-full rounded " id="" />
                    <input accept="image" type="file" onChange={(e) => {

                        setChatImg(e.target.files?.[0])
                    }} className="hidden " name="file" id="file" />
                    <label htmlFor="file">
                    <RiImageAddFill className="text-[40px] rounded-full    "/>
                    </label>
                   { sendingMessageStatus ? <button  className="bg-yellow-500 py-[5px] shadow-2xl rounded-[7px] text-slate-50 text-[20px]  px-[20px]" type="button">Sending</button> :
                    <button onClick={sendAMessage} className="bg-sky-500 py-[5px] shadow-2xl rounded-[7px] text-slate-50 text-[20px]  px-[20px]" type="button">Send</button>}
           </form>
            </div> : <ConversationSkeletonLoader/>}
            </div>
         
    )
}

export default User;