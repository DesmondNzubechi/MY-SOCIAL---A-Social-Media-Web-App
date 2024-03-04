'use client';

import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../components/config/firebase";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";

export const AllThePost = () => {
    interface allPostInfo {
        postImg: string
        postsContent: string,
        postId:string,
        postsDate: string,
        authorId: string,
        authorName: string,
        authorPics: string,
        postComment: any[],
        postLike: number,
        postRepost: number
    }

    const [allThePost, setAllThePost] = useState<allPostInfo[]>([]);

    useEffect(() => {
        const postCollection = collection(db, 'posts');
        try {
            const Unsub = onSnapshot(postCollection, (postSnapshot) => {
                const allPost: allPostInfo[] = postSnapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => doc.data() as allPostInfo);
                setAllThePost(allPost)
            })

            return () => Unsub();
        } catch (error) {
          alert(error)  
        }
    }, [])

    return allThePost
}