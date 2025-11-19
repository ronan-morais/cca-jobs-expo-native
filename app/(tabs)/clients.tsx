import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ClientsScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Clients</ThemedText>
      <ThemedText>Lista de clientes (placeholder).</ThemedText>
    </ThemedView>
  );
}

