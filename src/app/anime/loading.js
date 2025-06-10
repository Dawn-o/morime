"use client";
import { usePathname } from "next/navigation";
import { AnimeListSkeleton } from "@/components/skeleton/anime-list-skeleton";

export default function Loading() {
    const pathname = usePathname();

    if (pathname !== '/anime') {
        return null;
    }

    return <AnimeListSkeleton showSearch={true} />;
}