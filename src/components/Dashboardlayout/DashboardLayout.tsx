
import { Box } from '@mui/material';
import React from 'react';
import CustomHeader from '../CustomHeader/CustomHeader';
import CustomSidebar from '../CustomSidebar/CustomSidebar';

export default function DashboardLayout({ children }: any) {
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean | null>(null);
  const [getDropdown, setGetDropdown] = React.useState<string | null>(null);
  const [dropDownOpen, setDropDownOpen] = React.useState<string | null>(null);

  // const [themeDark, setThemeDark] = useState<string | null>(localStorage.getItem("dark") ? localStorage.getItem("dark") : 'false');
  // const [themeDark, setThemeDark] = useState<string | null>('true');

  // useEffect(() => {
  //     themeDark && localStorage.setItem("dark", themeDark);
  // }, [themeDark])

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      component={'div'}
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
    >
      <CustomHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dropDownOpen={dropDownOpen}
        setDropDownOpen={setDropDownOpen}
        getDropdown={getDropdown}
      />
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
    </Box>
  );
}
