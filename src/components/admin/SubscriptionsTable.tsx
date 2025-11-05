import { useState } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const totalPages = Math.ceil(sortedSubscriptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubscriptions = sortedSubscriptions.slice(startIndex, endIndex);

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => {
    const isActive = sortField === field;
    return (
      <Button
        variant="ghost"
        size="sm"
        className={`-ml-3 h-8 hover:bg-primary/10 hover:text-primary ${isActive ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}
        onClick={() => handleSort(field)}
      >
        {children}
        <ArrowUpDown className={`ml-2 h-4 w-4 ${isActive ? 'text-primary' : ''}`} />
      </Button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg bg-muted/20">
        <Table>
          <TableHeader>
            <TableRow>
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
            {paginatedSubscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground h-32">
                  No subscriptions yet
                </TableCell>
              </TableRow>
            ) : (
              paginatedSubscriptions.map((sub) => (
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

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedSubscriptions.length)} of {sortedSubscriptions.length} subscriptions
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
