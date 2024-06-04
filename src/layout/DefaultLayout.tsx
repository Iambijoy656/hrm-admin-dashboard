import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import CustomHeader from '../components/CustomHeader/CustomHeader';
import CustomSidebar from '../components/CustomSidebar/CustomSidebar';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean | null>(true);
  const [getDropdown, setGetDropdown] = React.useState<string | null>(null);
  const [dropDownOpen, setDropDownOpen] = React.useState<string | null>(null);

  // React.useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 900) {
  //       setSidebarOpen(false);
  //     } else {
  //       setSidebarOpen(true);
  //     }
  //   };

  //   // Add event listener for window resize
  //   window.addEventListener('resize', handleResize);

  //   // Initial check on component mount
  //   handleResize();

  //   // Cleanup event listener on component unmount
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <CustomSidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      dropDownOpen={dropDownOpen}
      setDropDownOpen={setDropDownOpen}
      getDropdown={getDropdown}
      setGetDropdown={setGetDropdown}
    >
      {children}
    </CustomSidebar>
  );
};

export default DefaultLayout;
