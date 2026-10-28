import * as React from 'react';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  children?: TreeNode[];
}

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  nodes: TreeNode[];
  defaultExpanded?: string[];
  onSelect?: (id: string) => void;
}

interface TreeNodeViewProps {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  toggle: (id: string) => void;
  onSelect?: (id: string) => void;
}

function TreeNodeView({ node, depth, expanded, toggle, onSelect }: TreeNodeViewProps) {
  const hasChildren = Boolean(node.children?.length);
  const isExpanded = expanded.has(node.id);

  return (
    <li className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        {hasChildren ? (
          <button
            type="button"
            onClick={() => toggle(node.id)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform motion-reduce:transform-none',
                isExpanded && 'rotate-90'
              )}
              aria-hidden="true"
            />
          </button>
        ) : (
          <span className="inline-block h-6 w-6" aria-hidden="true" />
        )}
        <button
          type="button"
          onClick={() => onSelect?.(node.id)}
          className="rounded-md px-2 py-1 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ marginInlineStart: `${depth * 0}px` }}
        >
          {node.label}
        </button>
      </div>
      {hasChildren && isExpanded && (
        <ul className="ms-6 flex flex-col gap-1" role="group">
          {node.children?.map(child => (
            <TreeNodeView
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              toggle={toggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  ({ className, nodes, defaultExpanded = [], onSelect, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState<Set<string>>(new Set(defaultExpanded));

    const toggle = (id: string) => {
      setExpanded(current => {
        const next = new Set(current);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    };

    return (
      <ul ref={ref} className={cn('flex flex-col gap-1', className)} {...props}>
        {nodes.map(node => (
          <TreeNodeView
            key={node.id}
            node={node}
            depth={0}
            expanded={expanded}
            toggle={toggle}
            onSelect={onSelect}
          />
        ))}
      </ul>
    );
  }
);
TreeView.displayName = 'TreeView';

export { TreeView };
