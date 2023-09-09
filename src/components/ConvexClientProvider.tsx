import { ReactNode, useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from "convex/react";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      convex.setAuth(async () =>
        getToken({ template: "convex", skipCache: true })
      );
    } else {
      convex.clearAuth();
    }
  }, [getToken, isSignedIn]);

  return (
      <ConvexProvider client={convex}>
        {children}
      </ConvexProvider>
  );
}