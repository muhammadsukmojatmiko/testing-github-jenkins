import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type AgPortalProps = {
  containerId?: string;
  children?: ReactNode;
  mount?: HTMLElement;
};
export const AgPortal: FC<AgPortalProps> = ({
  containerId = "portal-root",
  children,
  mount,
}) => {
  const _mount = mount ? mount : document.getElementById(containerId);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setElement(document.createElement("div"));
  }, []);

  useEffect(() => {
    _mount && element && _mount.appendChild(element);
    return () => {
      _mount && element && _mount.removeChild(element);
    };
  }, [_mount, element]);

  return element ? createPortal(children, element) : null;
};
