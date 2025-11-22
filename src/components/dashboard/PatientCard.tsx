import { Patient } from '@/types/patient';
import { Card } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { StoolQualityIndicator } from './StoolQualityIndicator';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Clock, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PatientCardProps {
  patient: Patient;
  onClick: () => void;
  isSelected: boolean;
}

export function PatientCard({ patient, onClick, isSelected }: PatientCardProps) {
  const hasAlerts = patient.alerts.length > 0;

  return (
    <Card
      className={cn(
        'p-4 cursor-pointer transition-all hover:shadow-md',
        isSelected && 'ring-2 ring-primary shadow-lg',
        hasAlerts && 'border-l-4 border-l-destructive'
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg">{patient.name}</h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {patient.procedureDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {patient.procedureTime}
            </div>
          </div>
        </div>
        <StatusBadge status={patient.status} />
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-muted-foreground">Stool Quality</span>
          </div>
          <StoolQualityIndicator quality={patient.lastStoolQuality} />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last Check-in</span>
          <span className="font-medium">
            {formatDistanceToNow(patient.lastCheckIn, { addSuffix: true })}
          </span>
        </div>

        {patient.symptoms.length > 0 && (
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1.5">
              {patient.symptoms.map((symptom) => (
                <Badge key={symptom} variant="outline" className="text-xs capitalize">
                  {symptom}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Readiness</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all rounded-full',
                    patient.readinessPrediction >= 80
                      ? 'bg-success'
                      : patient.readinessPrediction >= 60
                      ? 'bg-warning'
                      : 'bg-destructive'
                  )}
                  style={{ width: `${patient.readinessPrediction}%` }}
                />
              </div>
              <span className="text-sm font-semibold w-10 text-right">
                {patient.readinessPrediction}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
