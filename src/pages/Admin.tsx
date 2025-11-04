import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { UsersTable } from '@/components/admin/UsersTable';

interface Subscription {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

interface Profile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface UserRole {
  user_id: string;
  role: string;
}

export default function Admin() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<Record<string, string>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAndFetchData();
  }, []);

  const checkAdminAndFetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    setIsAdmin(true);
    await Promise.all([fetchSubscriptions(), fetchProfiles(), fetchUserRoles()]);
  };

  const fetchSubscriptions = async () => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load subscriptions.",
        variant: "destructive",
      });
    } else {
      setSubscriptions(data || []);
    }
  };

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load user profiles.",
        variant: "destructive",
      });
    } else {
      setProfiles(data || []);
    }
    setLoading(false);
  };

  const fetchUserRoles = async () => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('user_id, role');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load user roles.",
        variant: "destructive",
      });
    } else {
      const rolesMap = (data || []).reduce((acc, role) => {
        acc[role.user_id] = role.role;
        return acc;
      }, {} as Record<string, string>);
      setUserRoles(rolesMap);
    }
  };


  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1">
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4 md:px-6">
              <SidebarTrigger />
              <div className="flex-1" />
              <Button onClick={handleSignOut} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </header>

          <main className="p-4 md:p-8">
            <div className="mx-auto max-w-7xl">
              <h1 className="mb-8 text-3xl md:text-4xl font-bold">Admin Panel</h1>

              <Tabs defaultValue="subscriptions" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>

                <TabsContent value="subscriptions" className="mt-6" id="subscriptions">
                  <div className="rounded-lg border bg-card p-4 md:p-6">
                    <h2 className="mb-4 text-xl md:text-2xl font-semibold">
                      Waitlist Subscriptions ({subscriptions.length})
                    </h2>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Joined</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subscriptions.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-muted-foreground">
                                No subscriptions yet
                              </TableCell>
                            </TableRow>
                          ) : (
                            subscriptions.map((sub) => (
                              <TableRow key={sub.id}>
                                <TableCell>{sub.first_name}</TableCell>
                                <TableCell>{sub.last_name}</TableCell>
                                <TableCell>{sub.email}</TableCell>
                                <TableCell>{new Date(sub.created_at).toLocaleDateString()}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="users" className="mt-6" id="users">
                  <div className="rounded-lg border bg-card p-4 md:p-6">
                    <h2 className="mb-4 text-xl md:text-2xl font-semibold">
                      User Profiles ({profiles.length})
                    </h2>
                    <UsersTable
                      profiles={profiles}
                      userRoles={userRoles}
                      onRolesUpdate={fetchUserRoles}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
