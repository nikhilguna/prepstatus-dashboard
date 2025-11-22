import { useState } from 'react';
import { mockPatients } from '@/data/mockPatients';
import { Patient, Alert } from '@/types/patient';
import { PatientCard } from '@/components/dashboard/PatientCard';
import { PatientDetailPanel } from '@/components/dashboard/PatientDetailPanel';
import { AlertsDrawer } from '@/components/dashboard/AlertsDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bell, Search, Filter } from 'lucide-react';

const Index = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const allAlerts: Alert[] = mockPatients.flatMap((p) => p.alerts);

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">SmarterPrep Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Real-time colonoscopy prep monitoring
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={() => setAlertsOpen(true)}
            >
              <Bell className="h-4 w-4 mr-2" />
              Alerts
              {allAlerts.length > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-2 px-1.5 py-0.5 text-xs h-5 min-w-5 flex items-center justify-center"
                >
                  {allAlerts.length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="progressing">Progressing</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-lg border p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Patients</div>
            <div className="text-3xl font-bold">{mockPatients.length}</div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-sm text-muted-foreground mb-1">Ready for Procedure</div>
            <div className="text-3xl font-bold text-success">
              {mockPatients.filter((p) => p.status === 'ready').length}
            </div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-sm text-muted-foreground mb-1">At Risk</div>
            <div className="text-3xl font-bold text-destructive">
              {mockPatients.filter((p) => p.status === 'at-risk').length}
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onClick={() => setSelectedPatient(patient)}
              isSelected={selectedPatient?.id === patient.id}
            />
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No patients match your filters</p>
          </div>
        )}
      </main>

      {/* Side Panels */}
      <PatientDetailPanel
        patient={selectedPatient}
        open={selectedPatient !== null}
        onClose={() => setSelectedPatient(null)}
      />

      <AlertsDrawer
        alerts={allAlerts}
        open={alertsOpen}
        onClose={() => setAlertsOpen(false)}
        onViewPatient={(patientId) => {
          const patient = mockPatients.find((p) => p.id === patientId);
          if (patient) setSelectedPatient(patient);
        }}
      />
    </div>
  );
};

export default Index;
