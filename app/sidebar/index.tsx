import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";

export default function Sidebar() {
  return (
    <VStack className="gap-2">
        <Box className="pb-5">CcA Jobs</Box>
        <Link href={"/dashboard"}>
          <Button className="w-full justify-start">Dashboard</Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button variant="link" className="w-full justify-start text-white">Tasks</Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button variant="link" className="w-full justify-start text-white">Projects</Button>
        </Link>
        <Link href={"/dashboard"}>
          <Button variant="link" className="w-full justify-start">Clients</Button>
        </Link>
    </VStack>
  );
}
