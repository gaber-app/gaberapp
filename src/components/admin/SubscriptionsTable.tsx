import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Subscription {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

interface SubscriptionsTableProps {
  subscriptions: Subscription[];
}

type SortField = 'first_name' | 'last_name' | 'email' | 'created_at';
type SortOrder = 'asc' | 'desc';

export function SubscriptionsTable({ subscriptions }: SubscriptionsTableProps) {
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    if (sortField === 'created_at') {
      aValue = new Date(a[sortField]).getTime();
      bValue = new Date(b[sortField]).getTime();
    } else {
      aValue = a[sortField];
      bValue = b[sortField];
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSelectAll = () => {
    if (selectedSubscriptions.size === subscriptions.length) {
      setSelectedSubscriptions(new Set());
    } else {
      setSelectedSubscriptions(new Set(subscriptions.map(s => s.id)));
    }
  };

  const toggleSelectSubscription = (subscriptionId: string) => {
    const newSelected = new Set(selectedSubscriptions);
    if (newSelected.has(subscriptionId)) {
      newSelected.delete(subscriptionId);
    } else {
      newSelected.add(subscriptionId);
    }
    setSelectedSubscriptions(newSelected);
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
      {selectedSubscriptions.size > 0 && (
        <div className="flex items-center gap-4 rounded-lg border bg-muted/50 p-4">
          <span className="text-sm font-medium">
            {selectedSubscriptions.size} subscription(s) selected
          </span>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedSubscriptions.size === subscriptions.length && subscriptions.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>
                <SortButton field="first_name">First Name</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="last_name">Last Name</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="email">Email</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="created_at">Joined</SortButton>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedSubscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground h-32">
                  No subscriptions yet
                </TableCell>
              </TableRow>
            ) : (
              sortedSubscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedSubscriptions.has(sub.id)}
                      onCheckedChange={() => toggleSelectSubscription(sub.id)}
                    />
                  </TableCell>
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
  );
}
