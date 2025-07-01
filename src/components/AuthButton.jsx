import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "flowbite-react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button disabled color="gray">
        Sign In
      </Button>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={session.user.image}
          alt="profile"
          className="w-8 h-8 rounded-full"
        />

        <div className="hidden sm:flex flex-col text-white text-sm">
          <span className="font-medium">
            {session.user.name?.toLowerCase()}
          </span>
          <span className="text-xs text-gray-300">{session.user.email}</span>
        </div>

        <Button size="sm" onClick={() => signOut()} color="gray">
          Sign Out
        </Button>
      </div>
    );
  }

  return <Button onClick={() => signIn("google")}>Sign In</Button>;
}
