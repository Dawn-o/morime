"use client";

import { useState, useEffect } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { setSfwCookie, getSfwCookie } from "@/actions/cookie-actions";
import { useRouter } from "next/navigation";

export function SfwToggle() {
  const [isSfw, setIsSfw] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Load the initial cookie value
  useEffect(() => {
    const loadCookieValue = async () => {
      const cookieValue = await getSfwCookie();
      setIsSfw(cookieValue);
      setIsLoaded(true);
    };
    loadCookieValue();
  }, []);

  const enableSfw = async () => {
    setIsSfw(true);
    await setSfwCookie("true");
    router.refresh();
  };

  const enableNsfw = async () => {
    setIsSfw(false);
    await setSfwCookie("false");
    router.refresh();
  };

  if (!isLoaded) return null;

  return (
    <>
      {!isSfw && (
        <Button
          variant="outline"
          size="icon"
          onClick={enableSfw}
          className="relative"
          title="Currently in NSFW mode. Click to enable SFW mode."
        >
          <ShieldAlert className="h-[1.2rem] w-[1.2rem] text-red-500" />
          <span className="sr-only">Enable SFW mode</span>
        </Button>
      )}

      {isSfw && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative cursor-pointer"
              title="Currently in SFW mode. Click to enable NSFW mode."
            >
              <ShieldCheck className="h-[1.2rem] w-[1.2rem] text-green-500" />
              <span className="sr-only">Enable NSFW mode</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Enable NSFW Content?</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to enable content that may contain mature themes
                not suitable for all audiences. By continuing, you confirm that
                you are of legal age to view such content in your jurisdiction.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={enableNsfw}
                className="bg-red-500 hover:bg-red-600"
              >
                I Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
