import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router";

export default function HomeScreen() {
  return <Link href={"/dashboard"}><ThemedText>Dashboard</ThemedText></Link>;
}
