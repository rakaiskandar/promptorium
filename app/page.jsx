"use client";

import { useRouter } from "next/navigation";

const Home = () => {
    const router = useRouter();

    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Explore & Share
                <br className="max-md:hidden" />
                <span className="green_gradient text-center"> AI-Powered Prompts</span>
            </h1>

            <p className="desc text-center">
                Promptorium is a platform to discover, create and share 
                creative prompts AI for modern world
            </p>

            <button
                type='submit'
                className='mt-10 px-20 py-3 text-lg font-inter font-semibold bg-green-400 hover:bg-primary transition-all rounded-3xl text-white'
                onClick={() => router.push('/create-prompt')}
            >
                Start Creating
            </button>
        </section>
    )
}

export default Home