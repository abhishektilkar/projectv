import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';
// import axios from 'axios';
import UserDashboard from '../components/UserDashboard';
import { Octokit } from "@octokit/rest";
import prisma from '@/lib/prisma';
import Recive from '../components/Recive';

const Page = async () => {
    const session = await auth();
    const user = session?.user;
    if (!user) redirect('/');
    // console.log('session.sessionToken123@', session)
    const octokit = new Octokit({
        // @ts-ignore
        auth: session.accessToken
    });

    // Fetch authenticated user details
    const { data: userData } = await octokit.rest.users.getAuthenticated();
    // Fetch repositories for authenticated user
    // const it
    // console.log(userData)
    const { data: repositories } = await octokit.rest.repos.listForAuthenticatedUser({
        visibility: 'all',
        affiliation: 'owner,collaborator',
        sort: 'updated',
        per_page: 100,
    });
    // const solanaAddress
    // const  // 
    let userValue ;
    try {
        await prisma.$connect();
        const gitUserId = String(userData.id);
        userValue = await prisma.user.findUnique({
            where: { gitUserId }
        });
        // solanaAddress = user?.solanaAddress

    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
    // console.log("userValue", userValue);
    return (
        <div>
            {/* Optionally display access token for debugging  */}
            {
                // @ts-ignore
                // user && <p className='text-indigo-500'>sessionToken: {session.sessionToken}</p>
            }
            {/* Pass userData and repositories to UserDashboard */}
            {/* // @ts-ignore */}
            {
                // @ts-ignore
                <UserDashboard userData={userData} repositories={repositories} user={userValue}/>
            }
            {
                //@ts-ignore
                <Recive user={userValue} />
            }
        </div>
    );
};

export default Page;
