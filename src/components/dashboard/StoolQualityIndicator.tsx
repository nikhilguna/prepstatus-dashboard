import { StoolQuality } from '@/types/patient';
import { cn } from '@/lib/utils';

interface StoolQualityIndicatorProps {
  quality: StoolQuality;
  className?: string;
}

export function StoolQualityIndicator({ quality, className }: StoolQualityIndicatorProps) {
  const qualities: StoolQuality[] = ['solid', 'liquid', 'cloudy', 'clear'];
  const currentIndex = qualities.indexOf(quality);

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {qualities.map((q, index) => {
        const isActive = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={q} className="flex flex-col items-center gap-1">
            <div
              className={cn(
                'h-2 w-8 rounded-full transition-all',
                isActive
                  ? currentIndex === 0
                    ? 'bg-destructive'
                    : currentIndex === 1
                    ? 'bg-warning'
                    : currentIndex === 2
                    ? 'bg-warning'
                    : 'bg-success'
                  : 'bg-muted'
              )}
            />
            {isCurrent && (
              <span className="text-[10px] text-muted-foreground capitalize">{q}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
