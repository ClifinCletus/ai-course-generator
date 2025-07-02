import { SignIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
    const user = await currentUser();

    // If user is already signed in, redirect to dashboard
    //for already signed in users
    if (user) {
        redirect('/dashboard');
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <SignIn afterSignInUrl="/dashboard" />
        </div>
    );
}