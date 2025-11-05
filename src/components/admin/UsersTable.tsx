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
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground h-32">
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
