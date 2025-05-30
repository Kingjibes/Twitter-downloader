import React from 'react';
    import { cn } from '@/lib/utils';

    const Textarea = React.forwardRef(({ className, ...props }, ref) => {
      return (
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            'dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus-visible:ring-brand-orange',
            className
          )}
          ref={ref}
          {...props}
        />
      );
    });
    Textarea.displayName = 'Textarea';

    export { Textarea };