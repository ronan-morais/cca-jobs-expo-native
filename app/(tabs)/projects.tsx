import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ProjectsScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Projects</ThemedText>
      <ThemedText>Lista de projetos (placeholder).</ThemedText>
    </ThemedView>
  );
}

