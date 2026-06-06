import React from 'react';
import { Skeleton } from '../ui/skeleton';

export function OfferCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1e293b] p-5 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden relative">
      {/* Top: Badge & Price */}
      <div className="flex justify-between items-start mb-5">
        <Skeleton className="h-8 w-28 rounded-lg" /> {/* Type Badge */}
        <Skeleton className="h-7 w-24 rounded-lg" /> {/* Price */}
      </div>

      {/* Body: Route Timeline */}
      <div className="flex flex-col gap-6 relative mb-5 pl-1">
        {/* Origin */}
        <div className="flex items-start gap-4 z-10 relative">
          {/* Connecting Line */}
          <div className="absolute left-[7px] top-[12px] w-[2px] h-[calc(100%_+_24px)] bg-slate-100 dark:bg-slate-800 -z-10" />
          
          <Skeleton className="w-4 h-4 rounded-full shrink-0 mt-1" />
          <div className="space-y-1.5">
            <Skeleton className="h-2.5 w-12" /> {/* Label */}
            <Skeleton className="h-4 w-32" />   {/* City */}
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-4 z-10 relative">
          <Skeleton className="w-4 h-4 rounded-full shrink-0 mt-1" />
          <div className="space-y-1.5">
            <Skeleton className="h-2.5 w-12" /> {/* Label */}
            <Skeleton className="h-4 w-40" />   {/* City */}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-4" />

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-7 h-7 rounded-md" /> {/* Icon Box */}
          <Skeleton className="h-4 w-16" />           {/* Text */}
        </div>
        <div className="flex items-center gap-2.5 justify-end">
          <Skeleton className="h-4 w-24" />           {/* Text */}
          <Skeleton className="w-7 h-7 rounded-md" /> {/* Icon Box */}
        </div>
      </div>

      {/* CTA */}
      <Skeleton className="w-full h-12 rounded-xl" />
    </div>
  );
}
