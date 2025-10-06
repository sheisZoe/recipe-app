import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { BadgeInfo } from "lucide-react";

interface PopoverCardProps {
  className?: string;
  title: string;
  des?: string;
}

export function PopoverCard(props: PopoverCardProps) {
  const { className, title, des } = props;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className=" cursor-pointer">
          <BadgeInfo className=" w-4 h-4 text-yellow-600" />
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className={cn("w-60", className)}>
        <div className="space-y-2">
          <h4 className="font-medium text-sm leading-none">{title}</h4>
          <p className="text-xs text-muted-foreground">{des}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
