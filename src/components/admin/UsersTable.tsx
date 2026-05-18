import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { X } from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface UsersTableProps {
  profiles: Profile[];
  userRoles: Record<string, string>;
  onRolesUpdate: () => void;
}

export function UsersTable({ profiles, userRoles, onRolesUpdate }: UsersTableProps) {
  const { toast } = useToast();

  const updateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    // Delete existing role(s)
    const { error: deleteError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId);

    if (deleteError) {
      toast({
        title: "Error",
        description: "Failed to update user role.",
        variant: "destructive",
      });
      return;
    }

    // Insert new role
    const { error: insertError } = await supabase
      .from('user_roles')
      .insert({ user_id: userId, role: newRole });

    if (insertError) {
      toast({
        title: "Error",
        description: "Failed to update user role.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "User role updated successfully.",
      });
      onRolesUpdate();
    }
  };

  const removeUserRole = async (userId: string) => {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove user role.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'User role removed successfully.',
      });
      onRolesUpdate();
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg bg-muted/20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-20 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground h-32">
                  No user profiles yet
                </TableCell>
              </TableRow>
            ) : (
              profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>{profile.email}</TableCell>
                  <TableCell>
                    <Select
                      value={userRoles[profile.id] || 'user'}
                      onValueChange={(value) => updateUserRole(profile.id, value as 'admin' | 'user')}
                    >
                      <SelectTrigger className="w-32 border-border bg-transparent hover:bg-card">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(profile.updated_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    {userRoles[profile.id] ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            title="Remove role"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove user role?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove the "{userRoles[profile.id]}" role from {profile.email}. They will lose all permissions tied to that role.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => removeUserRole(profile.id)}>
                              Remove role
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
