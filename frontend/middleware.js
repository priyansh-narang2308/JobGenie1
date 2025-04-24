import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware({
  signInUrl: "/sign-in",     
  signOutUrl: "/sign-in",   
})

export const config = {
  matcher: [
    "/jobs(.*)",
    "/resume-tools(.*)",
    "/interviews(.*)",
    "/career-guidance(.*)",
    "/(api|trpc)(.*)",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}
