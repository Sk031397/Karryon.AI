'use client';
import { SignInButton, UserButton, useUser} from "@clerk/clerk-react";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { Button } from "@/components/ui/button";


export const AppHeader = () => {
  const user = useUser();
  return (
    <header className="flex items-center justify-between px-4 py-3">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image src={'/logo.png'} alt="logo" width={50} height={50} />
      </div>
      <div className="flex items-center gap-6">
        {user.isSignedIn ? (
          <UserButton/>
        ):(
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        )}
        <ModeToggle/>
      </div>
    </header>
  );
};

