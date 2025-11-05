import { Users, UserPlus, Settings, LucideIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import gaberLogoWhite from '@/assets/gaber-logo-white.svg';

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: number;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const initialMenuItems: MenuItem[] = [
  { title: "Subscriptions", url: "/admin/subscriptions", icon: UserPlus },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-4 py-6">
          <img 
            src={gaberLogoWhite} 
            alt="Gaber" 
            className={`h-8 w-auto transition-all ${isCollapsed ? 'h-6' : 'h-8'} brightness-0`}
          />
        </div>
        
        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive} 
                      className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                      disabled={item.isDisabled}
                    >
                      <NavLink to={item.url} className="flex items-center gap-2 justify-between w-full">
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </div>
                        {!isCollapsed && item.badge !== undefined && item.badge > 0 && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
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
