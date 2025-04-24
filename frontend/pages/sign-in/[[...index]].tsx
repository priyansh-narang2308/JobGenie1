import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <SignIn 
        path="/sign-in" 
        routing="path" 
        signUpUrl="/sign-up" 
        appearance={{
          elements: {
            card: "shadow-xl rounded-2xl border border-white/10",
          },
        }}
      />
    </div>
  );
}
