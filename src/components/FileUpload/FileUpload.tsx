import * as React from 'react';
import { Upload } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      accept,
      multiple = false,
      disabled = false,
      onFilesChange,
      label = 'Choose files',
      description,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = React.useState<File[]>([]);

    const handleFiles = (fileList: FileList | null) => {
      const nextFiles = fileList ? Array.from(fileList) : [];
      setFiles(nextFiles);
      onFilesChange?.(nextFiles);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-lg border border-dashed border-border bg-card p-4 text-card-foreground',
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <Upload className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="inline-flex min-h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50"
          >
            {label}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={event => handleFiles(event.target.files)}
            className="sr-only"
            aria-label={typeof label === 'string' ? label : 'File upload'}
          />
        </div>
        {files.length > 0 && (
          <ul className="flex flex-col gap-1 text-sm">
            {files.map(file => (
              <li key={`${file.name}-${file.size}`} className="truncate text-muted-foreground">
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
FileUpload.displayName = 'FileUpload';

export { FileUpload };
