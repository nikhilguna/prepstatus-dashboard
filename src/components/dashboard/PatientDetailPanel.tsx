import { Patient } from '@/types/patient';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { StoolQualityIndicator } from './StoolQualityIndicator';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow, format } from 'date-fns';
import {
  Calendar,
  Clock,
  Activity,
  AlertTriangle,
  Bell,
  CalendarX,
  UserX,
  ArrowRightLeft,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PatientDetailPanelProps {
  patient: Patient | null;
  open: boolean;
  onClose: () => void;
}

export function PatientDetailPanel({ patient, open, onClose }: PatientDetailPanelProps) {
  if (!patient) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>{patient.name}</span>
            <StatusBadge status={patient.status} />
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)] mt-6 pr-4">
          <div className="space-y-6">
            {/* Patient Info */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Patient Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-sm">
                  <div className="text-xs text-muted-foreground">Date of Birth</div>
                  <div className="font-medium">
                    {format(patient.dateOfBirth, 'MMM d, yyyy')}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-xs text-muted-foreground">Prep Type</div>
                  <div className="font-medium">MiraLAX + Gatorade</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Procedure Info */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Procedure Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Date</div>
                    <div className="font-medium">
                      {format(patient.procedureDate, 'MMMM d, yyyy')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Time</div>
                    <div className="font-medium">{patient.procedureTime}</div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Alerts */}
            {patient.alerts.length > 0 && (
              <>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Active Alerts
                  </h3>
                  <div className="space-y-2">
                    {patient.alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-medium text-destructive">{alert.message}</p>
                          <Badge variant="outline" className="text-xs">
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Current Status */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Current Status
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Stool Quality</div>
                  <StoolQualityIndicator quality={patient.lastStoolQuality} className="mb-1" />
                  <p className="text-xs text-muted-foreground capitalize">
                    Current: {patient.lastStoolQuality}
                  </p>
                </div>

                {patient.symptoms.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Active Symptoms</div>
                    <div className="flex gap-2">
                      {patient.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="outline" className="capitalize">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Readiness Prediction</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          patient.readinessPrediction >= 80
                            ? 'bg-success'
                            : patient.readinessPrediction >= 60
                            ? 'bg-warning'
                            : 'bg-destructive'
                        }`}
                        style={{ width: `${patient.readinessPrediction}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{patient.readinessPrediction}%</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Check-in Timeline */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Check-in Timeline
              </h3>
              <div className="space-y-3">
                {patient.checkIns
                  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                  .map((checkIn, index) => (
                    <div key={checkIn.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            index === 0 ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                        {index < patient.checkIns.length - 1 && (
                          <div className="w-px h-full bg-border mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">
                            {format(checkIn.timestamp, 'MMM d, h:mm a')}
                          </span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {checkIn.stoolQuality}
                          </Badge>
                        </div>
                        {checkIn.symptoms.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <Activity className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {checkIn.symptoms.join(', ')}
                            </span>
                          </div>
                        )}
                        {checkIn.notes && (
                          <p className="text-xs text-muted-foreground mt-1">{checkIn.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Notify Patient
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <CalendarX className="h-4 w-4 mr-2" />
                  Reschedule
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Insert Standby
                </Button>
                <Button variant="outline" size="sm" className="justify-start text-destructive">
                  <UserX className="h-4 w-4 mr-2" />
                  Prep Failure
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
