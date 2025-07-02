// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// // Add the routes to be protected here
// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// export default clerkMiddleware((auth, req) => {
//     if (isProtectedRoute(req)) auth().protect();
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };



import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Add the routes to be protected here
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
    // For protected routes, require authentication
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};