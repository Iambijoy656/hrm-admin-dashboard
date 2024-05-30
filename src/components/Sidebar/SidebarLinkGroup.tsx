import { ReactNode, useState } from 'react';

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean ,subOpen:boolean) => ReactNode;
  activeCondition: boolean;
}

const SidebarLinkGroup = ({
  children,
  activeCondition,
}: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean>(activeCondition);
  const [subOpen, setSubOpen] = useState<boolean>(activeCondition);

  const handleClick = () => {
    setOpen(!open);
    setSubOpen(!subOpen);
  };

  return <li>{children(handleClick, open, subOpen)}</li>;
};

export default SidebarLinkGroup;
