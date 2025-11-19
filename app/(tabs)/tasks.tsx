import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useEffect, useState } from "react";

export default function TasksScreen() {
  const [todos, setTodos] = useState<
    {
      id: number;
      nome: string;
      descricao: string;
      horas: number;
      status: string;
      fotoUrl?: string;
    }[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formTodo, setFormTodo] = useState<{
    nome: string;
    descricao: string;
    horas: number;
    status: string;
    fotoUrl?: string;
  }>({ nome: "", descricao: "", horas: 0, status: "nao iniciado", fotoUrl: undefined });
  const [errors, setErrors] = useState<{ nome?: string; descricao?: string; horas?: string }>({});

  // Hidrata do localStorage ao montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("tasks.todos");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setTodos(parsed);
          }
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // Persiste no localStorage quando a lista muda
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("tasks.todos", JSON.stringify(todos));
      } catch {
        // ignore
      }
    }
  }, [todos]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormTodo({ nome: "", descricao: "", horas: 0, status: "nao iniciado", fotoUrl: undefined });
    setErrors({});
  };
  const validate = () => {
    const newErrors: { nome?: string; descricao?: string; horas?: string } = {};
    if (!formTodo.nome.trim()) newErrors.nome = "Informe o nome do item";
    if (!formTodo.descricao.trim() || formTodo.descricao.trim().length < 10) {
      newErrors.descricao = "Descrição deve ter pelo menos 10 caracteres";
    }
    if (formTodo.horas < 0) newErrors.horas = "Horas não podem ser negativas";
    if (formTodo.horas > 100) newErrors.horas = "Horas devem ser menores ou iguais a 100";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveTodo = () => {
    if (!validate()) return;
    if (editingId !== null) {
      setTodos((prev) => prev.map((t) => (t.id === editingId ? { ...t, ...formTodo, id: editingId } : t)));
    } else {
      setTodos((prev) => [...prev, { id: Date.now(), ...formTodo }]);
    }
    closeModal();
  };
  const onFileChange = (e: any) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormTodo((prev) => ({ ...prev, fotoUrl: url }));
    }
  };

  const editTodo = (todo: { id: number; nome: string; descricao: string; horas: number; status: string; fotoUrl?: string }) => {
    setEditingId(todo.id);
    setFormTodo({ nome: todo.nome, descricao: todo.descricao, horas: todo.horas, status: todo.status, fotoUrl: todo.fotoUrl });
    setErrors({});
    openModal();
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "transparent" }}>
      <HStack className="w-full">
        <VStack className="w-full">
          <ThemedText type="title">Tasks</ThemedText>
          {/* <ThemedText>Lista de tarefas (placeholder).</ThemedText> */}
        </VStack>
        <VStack className="items-center w-fit flex-row contents">
          <Button variant="outline" className="text-white">
            <ButtonText>Add Directory</ButtonText>
          </Button>
          <Button className="text-black ml-2">
            <ButtonText>Add Task</ButtonText>
          </Button>
        </VStack>
      </HStack>
      <Divider className="mt-5" />
      <HStack>
      <VStack className="w-full rounded-lg shadow-sm border border-outline-200 dark:border-outline-700">
        <ThemedView style={{ padding: 16, borderRadius: 8 }}>
          <ThemedText type="subtitle" className="mb-4">Detalhes da Tarefa</ThemedText>
          <VStack space="md">
          <VStack>
            <ThemedText className="text-sm font-medium mb-1">Nome da tarefa</ThemedText>
            <input
              className="border border-outline-200 dark:border-outline-700 bg-background-50 dark:bg-background-50 text-typography-900 dark:text-typography-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 u-outline-opacity-50"
              placeholder="Digite o nome da tarefa"
              type="text"
            />
          </VStack>
          <VStack>
            <ThemedText className="text-sm font-medium mb-1">Descrição da tarefa</ThemedText>
            <textarea
              className="border border-outline-200 dark:border-outline-700 bg-background-50 dark:bg-background-50 text-typography-900 dark:text-typography-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 u-outline-opacity-50"
              rows={3}
              placeholder="Descreva a tarefa"
            />
          </VStack>
          <VStack>
            <label htmlFor="fotos-tarefa" className="text-sm font-medium mb-1">Fotos relacionadas à tarefa</label>
            <input
              className="border border-outline-200 dark:border-outline-700 bg-background-50 dark:bg-background-50 text-typography-900 dark:text-typography-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 u-outline-opacity-50"
              id="fotos-tarefa"
              type="file"
              accept="image/*"
              multiple
            />
          </VStack>

          <Divider className="my-4" />

          <ThemedText type="subtitle" className="mb-2">To-do List</ThemedText>
          <HStack className="justify-between items-center mb-3">
            <ThemedText className="text-sm text-typography-600">Itens cadastrados</ThemedText>
            <Button onPress={openModal}>
              <ButtonText>Adicionar item</ButtonText>
            </Button>
          </HStack>
          <VStack space="sm">
            {todos.length === 0 ? (
              <ThemedText className="text-sm text-typography-500">Nenhum item cadastrado.</ThemedText>
            ) : (
              todos.map((todo) => (
                <HStack key={todo.id} className="border border-outline-200 dark:border-outline-700 rounded-md p-3 items-start gap-3">
                  {todo.fotoUrl ? (
                    <img src={todo.fotoUrl} alt={todo.nome} className="w-16 h-16 rounded object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded bg-background-100 dark:bg-background-800" />
                  )}
                  <VStack className="flex-1">
                    <ThemedText className="text-sm font-semibold">{todo.nome}</ThemedText>
                    <ThemedText className="text-xs text-typography-600">Status: {todo.status}</ThemedText>
                    <ThemedText className="text-xs text-typography-600">Horas: {todo.horas}</ThemedText>
                    {todo.descricao ? (
                      <ThemedText className="text-xs mt-1">{todo.descricao}</ThemedText>
                    ) : null}
                  </VStack>
                  <HStack className="gap-2">
                    <Button variant="outline" onPress={() => editTodo(todo)}>
                      <ButtonText>Editar</ButtonText>
                    </Button>
                    <Button variant="outline" onPress={() => removeTodo(todo.id)}>
                      <ButtonText>Remover</ButtonText>
                    </Button>
                  </HStack>
                </HStack>
              ))
            )}
          </VStack>

          <HStack className="justify-end mt-4">
            <Button variant="outline" className="mr-2">
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button>
              <ButtonText>Salvar Tarefa</ButtonText>
            </Button>
          </HStack>
          </VStack>
        </ThemedView>
      </VStack>
      </HStack>

      {isModalOpen && (
        <div className="fixed inset-0 bg-background-0/60 dark:bg-background-950/60 flex items-center justify-center z-50">
          <VStack className="w-full max-w-xl rounded-lg shadow-lg">
            <ThemedView style={{ borderRadius: 12, padding: 24 }}>
              <ThemedText type="subtitle" className="mb-3">Novo item do To-do</ThemedText>
              <VStack space="md">
              <VStack>
                <label htmlFor="nome-item" className="text-sm font-medium mb-1">Nome do item</label>
                <input
                  className="border border-outline-200 dark:border-outline-700 bg-background-50 dark:bg-background-50 text-typography-900 dark:text-typography-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 u-outline-opacity-50"
                  placeholder="Digite o nome do item"
                  type="text"
                  id="nome-item"
                  value={formTodo.nome}
                  onChange={(e: any) => setFormTodo((p) => ({ ...p, nome: e.target.value }))}
                  aria-invalid={errors.nome ? 'true' : undefined}
                  aria-describedby={errors.nome ? "erro-nome" : undefined}
                />
                {errors.nome ? (
                  <ThemedText id="erro-nome" className="text-xs text-error-600 mt-1">{errors.nome}</ThemedText>
                ) : null}
              </VStack>
              <VStack>
                <label htmlFor="descricao-item" className="text-sm font-medium mb-1">Descrição do item</label>
                <textarea
                  className="border border-outline-200 dark:border-outline-700 bg-background-50 dark:bg-background-50 text-typography-900 dark:text-typography-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 u-outline-opacity-50"
                  rows={3}
                  placeholder="Descreva o item"
                  id="descricao-item"
                  value={formTodo.descricao}
                  onChange={(e: any) => setFormTodo((p) => ({ ...p, descricao: e.target.value }))}
                  aria-invalid={errors.descricao ? 'true' : undefined}
                  aria-describedby={errors.descricao ? "erro-descricao" : undefined}
                />
                {errors.descricao ? (
                  <ThemedText id="erro-descricao" className="text-xs text-error-600 mt-1">{errors.descricao}</ThemedText>
                ) : null}
              </VStack>
              <HStack className="gap-3">
                <VStack className="flex-1">
                  <label htmlFor="horas-item" className="text-sm font-medium mb-1">Quantidade de horas trabalhadas</label>
                  <input
                    className="border border-outline-200 dark:border-outline-700 bg-background-50 dark:bg-background-50 text-typography-900 dark:text-typography-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 u-outline-opacity-50"
                    type="number"
                    min={0}
                    step={0.1}
                    placeholder="0"
                    id="horas-item"
                    value={formTodo.horas}
                    onChange={(e: any) => setFormTodo((p) => ({ ...p, horas: parseFloat(e.target.value || "0") }))}
                    aria-invalid={errors.horas ? 'true' : undefined}
                    aria-describedby={errors.horas ? "erro-horas" : undefined}
                  />
                  {errors.horas ? (
                    <ThemedText id="erro-horas" className="text-xs text-error-600 mt-1">{errors.horas}</ThemedText>
                  ) : null}
                </VStack>
                <VStack className="flex-1">
                  <label htmlFor="status" className="text-sm font-medium mb-1">Status</label>
                  <select
                    className="border border-outline-200 dark:border-outline-700 bg-background-50 dark:bg-background-50 text-typography-900 dark:text-typography-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 u-outline-opacity-50"
                    id="status"
                    value={formTodo.status}
                    onChange={(e: any) => setFormTodo((p) => ({ ...p, status: e.target.value }))}
                  >
                    <option value="nao iniciado">nao iniciado</option>
                    <option value="em andamento">em andamento</option>
                    <option value="concluido">concluido</option>
                  </select>
                </VStack>
              </HStack>
              <VStack>
                <label htmlFor="foto-item" className="text-sm font-medium mb-1">Foto do item</label>
                <input
                  className="border border-outline-200 dark:border-outline-700 bg-background-50 dark:bg-background-50 text-typography-900 dark:text-typography-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 u-outline-opacity-50"
                  type="file"
                  accept="image/*"
                  id="foto-item"
                  onChange={onFileChange}
                />
                {formTodo.fotoUrl ? (
                  <img src={formTodo.fotoUrl} alt="preview" className="mt-2 w-24 h-24 rounded object-cover" />
                ) : null}
              </VStack>

              <HStack className="justify-end mt-4">
                <Button variant="outline" className="mr-2" onPress={closeModal}>
                  <ButtonText>Cancelar</ButtonText>
                </Button>
                <Button
                  onPress={saveTodo}
                  disabled={
                    !formTodo.nome ||
                    !formTodo.descricao ||
                    formTodo.descricao.trim().length < 10 ||
                    formTodo.horas < 0 ||
                    formTodo.horas > 100
                  }
                >
                  <ButtonText>{editingId ? "Salvar Alterações" : "Salvar Item"}</ButtonText>
                </Button>
              </HStack>
              </VStack>
            </ThemedView>
          </VStack>
        </div>
      )}
    </ThemedView>
  );
}
