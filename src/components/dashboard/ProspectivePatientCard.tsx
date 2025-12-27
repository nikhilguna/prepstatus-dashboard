import { Patient } from '@/types/patient';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar, Clock, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProspectivePatientCardProps {
  patient: Patient;
}

export function ProspectivePatientCard({ patient }: ProspectivePatientCardProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(patient.activationCode);
    setCopied(true);
    toast.success('Activation code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const prepTypeLabels: Record<string, string> = {
    'miralax-gatorade': 'MiraLAX + Gatorade',
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{patient.name}</h3>
          <div className="text-sm text-muted-foreground">
            DOB: {format(patient.dateOfBirth, 'MMM d, yyyy')}
          </div>
        </div>
        <Badge variant="secondary">Pending Activation</Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {format(patient.procedureDate, 'MMM d, yyyy')}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {patient.procedureTime}
          </div>
        </div>

        <div className="text-sm">
          <span className="text-muted-foreground">Prep: </span>
          <span className="font-medium">{prepTypeLabels[patient.prepType]}</span>
        </div>

        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Activation Code</div>
              <div className="font-mono text-lg font-bold tracking-wider">
                {patient.activationCode}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={copyCode}>
              {copied ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
