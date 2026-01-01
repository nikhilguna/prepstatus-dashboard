import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { mockPatients } from '@/data/mockPatients';
import { Patient, Alert } from '@/types/patient';
import { PatientCard } from '@/components/dashboard/PatientCard';
import { ProspectivePatientCard } from '@/components/dashboard/ProspectivePatientCard';
import { PatientDetailPanel } from '@/components/dashboard/PatientDetailPanel';
import { AlertsDrawer } from '@/components/dashboard/AlertsDrawer';
import { AddPatientDialog } from '@/components/dashboard/AddPatientDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bell, Search, Filter, Users, UserPlus, LayoutGrid, List, LogOut } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const Index = () => {
  const { clinicName, logout } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentPatients = patients.filter((p) => p.isActivated);
  const prospectivePatients = patients.filter((p) => !p.isActivated);

  const allAlerts: Alert[] = currentPatients.flatMap((p) => p.alerts);

  const filteredCurrentPatients = currentPatients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProspectivePatients = prospectivePatients.filter((patient) => {
    return patient.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddPatient = (newPatient: Patient) => {
    setPatients((prev) => [...prev, newPatient]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">SmarterPrep Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                {clinicName ? `${clinicName} • ` : ''}Real-time colonoscopy prep monitoring
              </p>
            </div>
            <div className="flex items-center gap-3">
              <AddPatientDialog onAddPatient={handleAddPatient} />
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
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
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
            <ToggleGroup 
              type="single" 
              value={viewMode} 
              onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}
            >
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="current" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Current Patients
              <Badge variant="secondary" className="ml-1">
                {currentPatients.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="prospective" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Prospective
              <Badge variant="secondary" className="ml-1">
                {prospectivePatients.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg border p-4">
                <div className="text-sm text-muted-foreground mb-1">Active Patients</div>
                <div className="text-3xl font-bold">{currentPatients.length}</div>
              </div>
              <div className="bg-card rounded-lg border p-4">
                <div className="text-sm text-muted-foreground mb-1">Ready for Procedure</div>
                <div className="text-3xl font-bold text-success">
                  {currentPatients.filter((p) => p.status === 'ready').length}
                </div>
              </div>
              <div className="bg-card rounded-lg border p-4">
                <div className="text-sm text-muted-foreground mb-1">At Risk</div>
                <div className="text-3xl font-bold text-destructive">
                  {currentPatients.filter((p) => p.status === 'at-risk').length}
                </div>
              </div>
            </div>

            {/* Patient List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4' : 'flex flex-col gap-3'}>
              {filteredCurrentPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onClick={() => setSelectedPatient(patient)}
                  isSelected={selectedPatient?.id === patient.id}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {filteredCurrentPatients.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No patients match your filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="prospective" className="space-y-6">
            <div className="bg-card rounded-lg border p-4">
              <div className="text-sm text-muted-foreground mb-1">Pending Activation</div>
              <div className="text-3xl font-bold">{prospectivePatients.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Patients who haven't downloaded the app yet
              </p>
            </div>

            {/* Prospective Patient List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4' : 'flex flex-col gap-3'}>
              {filteredProspectivePatients.map((patient) => (
                <ProspectivePatientCard key={patient.id} patient={patient} viewMode={viewMode} />
              ))}
            </div>

            {filteredProspectivePatients.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No prospective patients</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
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
          const patient = patients.find((p) => p.id === patientId);
          if (patient) setSelectedPatient(patient);
        }}
      />
    </div>
  );
};

export default Index;
