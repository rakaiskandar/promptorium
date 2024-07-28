"use client";

import { useState, useEffect } from 'react'
import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    const fetchPost = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
    
        setPosts(data);
    }
    
    useEffect(() => {
        if(session?.user.id) {
            fetchPost();
        } else {
            router.replace('/');
        }
    }, []);

    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPost = posts.filter((item) => item._id !== post._id);

                setPosts(filteredPost);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Profile
            name="Me"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile