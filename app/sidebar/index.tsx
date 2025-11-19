import { ThemedText } from "@/components/themed-text";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { useEffect, useState } from "react";
import { script } from "@/components/ui/gluestack-ui-provider/script";
import { Link, usePathname } from "expo-router";

export default function Sidebar() {
  const pathname = usePathname();
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('ui.theme');
      if (saved === 'dark' || saved === 'light') return saved;
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    script(mode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('ui.theme', mode);
    }
  }, [mode]);
  const items = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Tasks", href: "/tasks" },
    { label: "Projects", href: "/projects" },
    { label: "Clients", href: "/clients" },
  ];

  return (
    <VStack className="gap-2 h-full justify-between">
      <Box className="pb-5">
        <ThemedText type="title">CcA Jobs</ThemedText>
      </Box>
      {items.map((item) => {
        const isActive = pathname === item.href;
        const variant = isActive ? "solid" : "outline";
        return (
          <Link key={item.href} href={item.href as any}>
            <Button variant={variant as any} className="w-full justify-start">
              <ButtonText className={variant === "outline" ? "text-white" : undefined}>
                {item.label}
              </ButtonText>
            </Button>
          </Link>
        );
      })}
      <Box className="pt-4 mt-auto border-t border-outline-200 dark:border-outline-700">
        <HStack className="items-center justify-between">
          <ThemedText className="text-sm">Tema</ThemedText>
          <label className="flex items-center gap-2">
            <ThemedText className="text-xs">{mode === 'dark' ? 'Escuro' : 'Claro'}</ThemedText>
            <input
              type="checkbox"
              role="switch"
              aria-label="Alternar tema claro/escuro"
              className="u-outline-opacity-50"
              checked={mode === 'dark'}
              onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
            />
          </label>
        </HStack>
      </Box>
    </VStack>
  );
}
