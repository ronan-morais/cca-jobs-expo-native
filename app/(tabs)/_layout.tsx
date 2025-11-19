import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Slot } from "expo-router";
import React from "react";
import Sidebar from "../sidebar";

export default function TabLayout() {
  return (
    <HStack className="gap-3 h-full p-5">
      <VStack
        className="p-6 hidden w-full max-w-60 rounded-md lg:flex md:col-span-3 xl:col-span-2 h-full"
      >
        <Sidebar />
      </VStack>
      <VStack
        className="w-full bg-background-50 p-6 rounded-md col-span-12 md:col-span-9 xl:col-span-10"
      >
        <Slot />
      </VStack>
    </HStack>
  );
}