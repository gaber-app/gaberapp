import { Users, UserPlus, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import gaberLogoWhite from '@/assets/gaber-logo-white.svg';

const menuItems = [
  { title: "Subscriptions", url: "/admin/subscriptions", icon: UserPlus },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="bg-primary border-primary">
      <SidebarContent>
        <div className="px-4 py-6">
          <img 
            src={gaberLogoWhite} 
            alt="Gaber" 
            className={`h-8 w-auto transition-all ${isCollapsed ? 'h-6' : 'h-8'}`}
          />
        </div>
        
        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} className="text-primary-foreground hover:bg-primary-glow data-[active=true]:bg-primary-glow">
                      <NavLink to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
