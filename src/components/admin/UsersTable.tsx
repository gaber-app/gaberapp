import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

type SortField = 'email' | 'role' | 'created_at' | 'updated_at';
type SortOrder = 'asc' | 'desc';

export function UsersTable({ profiles, userRoles, onRolesUpdate }: UsersTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const { toast } = useToast();

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedProfiles = [...profiles].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    if (sortField === 'role') {
      aValue = userRoles[a.id] || 'user';
      bValue = userRoles[b.id] || 'user';
    } else if (sortField === 'email') {
      aValue = a.email;
      bValue = b.email;
    } else {
      aValue = new Date(a[sortField]).getTime();
      bValue = new Date(b[sortField]).getTime();
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSelectAll = () => {
    if (selectedUsers.size === profiles.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(profiles.map(p => p.id)));
    }
  };

  const toggleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

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

  const bulkUpdateRoles = async (newRole: 'admin' | 'user') => {
    const updates = Array.from(selectedUsers).map(async (userId) => {
      // Delete existing role(s)
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (deleteError) return { error: deleteError };

      // Insert new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: newRole });

      return { error: insertError };
    });

    const results = await Promise.all(updates);
    const hasError = results.some(r => r.error);

    if (hasError) {
      toast({
        title: "Error",
        description: "Some roles failed to update.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Updated ${selectedUsers.size} user(s) role to ${newRole}.`,
      });
      setSelectedUsers(new Set());
      onRolesUpdate();
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8"
      onClick={() => handleSort(field)}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  return (
    <div className="space-y-4">
      {selectedUsers.size > 0 && (
        <div className="flex items-center gap-4 rounded-lg border bg-muted/50 p-4">
          <span className="text-sm font-medium">
            {selectedUsers.size} user(s) selected
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm">Change role to:</span>
            <Select onValueChange={(value) => bulkUpdateRoles(value as 'admin' | 'user')}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedUsers.size === profiles.length && profiles.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>
                <SortButton field="email">Email</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="role">Role</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="created_at">Created</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="updated_at">Last Updated</SortButton>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProfiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No user profiles yet
                </TableCell>
              </TableRow>
            ) : (
              sortedProfiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.has(profile.id)}
                      onCheckedChange={() => toggleSelectUser(profile.id)}
                    />
                  </TableCell>
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
