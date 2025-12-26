import { Home, Info, FolderKanban } from "lucide-react";

export const NavigationItem: {
  to: string;
  label: string;
  icon: React.ElementType;
}[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: Info },
  { to: "/projects", label: "Projects", icon: FolderKanban },
];
