import { Alert } from '@/types/patient';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AlertsDrawerProps {
  alerts: Alert[];
  open: boolean;
  onClose: () => void;
  onViewPatient: (patientId: string) => void;
}

export function AlertsDrawer({ alerts, open, onClose, onViewPatient }: AlertsDrawerProps) {
  const highAlerts = alerts.filter((a) => a.severity === 'high');
  const mediumAlerts = alerts.filter((a) => a.severity === 'medium');

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Active Alerts ({alerts.length})
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)] mt-6 pr-4">
          <div className="space-y-6">
            {highAlerts.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-destructive uppercase tracking-wide">
                  High Priority
                </h3>
                <div className="space-y-2">
                  {highAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="destructive" className="text-xs">
                          {alert.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2">{alert.message}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          onViewPatient(alert.patientId);
                          onClose();
                        }}
                      >
                        View Patient
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mediumAlerts.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-warning uppercase tracking-wide">
                  Medium Priority
                </h3>
                <div className="space-y-2">
                  {mediumAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-lg bg-warning/10 border border-warning/20"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-warning/50 text-warning"
                        >
                          {alert.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2">{alert.message}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          onViewPatient(alert.patientId);
                          onClose();
                        }}
                      >
                        View Patient
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {alerts.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
                  <AlertTriangle className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-semibold mb-1">No Active Alerts</h3>
                <p className="text-sm text-muted-foreground">All patients are on track</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
