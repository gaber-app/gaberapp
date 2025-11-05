import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';
import { SubscriptionsTable } from '@/components/admin/SubscriptionsTable';

interface Subscription {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

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
    setLoading(false);
  };

  const exportToCSV = () => {
    if (subscriptions.length === 0) {
      toast({
        title: "No data",
        description: "There are no subscriptions to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = ['First Name', 'Last Name', 'Email', 'Joined Date'];
    const csvData = subscriptions.map(sub => [
      sub.first_name,
      sub.last_name,
      sub.email,
      new Date(sub.created_at).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `subscriptions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Success",
      description: `Exported ${subscriptions.length} subscriptions to CSV.`,
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Waitlist Subscriptions</h1>
          <p className="text-muted-foreground mt-2">
            Manage and view all waitlist subscribers ({subscriptions.length} total)
          </p>
        </div>
        <Button onClick={exportToCSV} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <SubscriptionsTable subscriptions={subscriptions} />
      </div>
    </div>
  );
}
