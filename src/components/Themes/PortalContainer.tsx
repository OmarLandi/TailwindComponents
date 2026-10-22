import * as React from 'react';
import type { ColorMode, PaletteName } from './types';

const PortalContainerContext = React.createContext<HTMLElement | null>(null);

export interface PortalContainerProviderProps {
  colorMode: ColorMode;
  palette: PaletteName;
  children: React.ReactNode;
}

export const PortalContainerProvider: React.FC<PortalContainerProviderProps> = ({
  colorMode,
  palette,
  children,
}) => {
  const nodeRef = React.useRef<HTMLDivElement | null>(null);
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const node = document.createElement('div');
    node.setAttribute('data-theme-portal', '');
    nodeRef.current = node;
    document.body.appendChild(node);
    setContainer(node);

    return () => {
      node.remove();
      nodeRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (!nodeRef.current) return;
    nodeRef.current.className = `${colorMode} theme-${palette}`;
  }, [colorMode, palette]);

  return (
    <PortalContainerContext.Provider value={container}>{children}</PortalContainerContext.Provider>
  );
};
PortalContainerProvider.displayName = 'PortalContainerProvider';

export const usePortalContainer = (): HTMLElement | null =>
  React.useContext(PortalContainerContext);
