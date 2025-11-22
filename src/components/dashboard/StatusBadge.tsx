import { PatientStatus } from '@/types/patient';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: PatientStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    ready: {
      label: 'Ready',
      icon: CheckCircle2,
      className: 'bg-success/10 text-success border-success/20',
    },
    progressing: {
      label: 'Progressing',
      icon: Clock,
      className: 'bg-warning/10 text-warning border-warning/20',
    },
    'at-risk': {
      label: 'At Risk',
      icon: AlertTriangle,
      className: 'bg-destructive/10 text-destructive border-destructive/20',
    },
  };

  const variant = variants[status];
  const Icon = variant.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        variant.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {variant.label}
    </div>
  );
}
