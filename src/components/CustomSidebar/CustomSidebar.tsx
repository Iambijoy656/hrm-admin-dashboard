'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import avatar from '../../public/pngegg.png';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { HiLink, HiOutlineDocumentReport } from 'react-icons/hi';
import { PiLinkDuotone } from 'react-icons/pi';
import {
  TbHomeSignal,
  TbNavigationDiscount,
  TbProgressHelp,
} from 'react-icons/tb';
import { BsQuestionLg } from 'react-icons/bs';

import { RiArrowRightSLine, RiShutDownLine } from 'react-icons/ri';
import { MdPayment } from 'react-icons/md';
import { Box, Typography, Tooltip } from '@mui/material';
import { LiaEdit } from 'react-icons/lia';
import { IoBarChartOutline } from 'react-icons/io5';
import { LuLayoutDashboard } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';

type SubMenuType = {
  title: string;
  path: string;
  icon: React.JSX.Element;
};

type MenuType = {
  mainTitle: string;
  subMenus?: SubMenuType[];
  path: string;
  mainIcon: React.JSX.Element;
};

type SidebarProps = {
  children: React.ReactNode;
  sidebarOpen: boolean | null;
  setSidebarOpen: Dispatch<SetStateAction<boolean | null>>;
  dropDownOpen: string | null;
  setDropDownOpen: Dispatch<SetStateAction<string | null>>;
  getDropdown: string | null;
  setGetDropdown: Dispatch<SetStateAction<string | null>>;
};

const sidebarTopLinks: any = [
  {
    title: 'Edit profile',
    path: '/user-profile',
    icon: <LiaEdit />,
  },
  {
    title: 'Overview',
    path: '/statistics',
    icon: <AiOutlineFundProjectionScreen />,
  },
  {
    title: 'Home',
    path: '/',
    icon: <TbHomeSignal />,
  },
  {
    title: 'Support',
    path: '/faq',
    icon: <BsQuestionLg />,
  },
  // {
  //   title: "Logout",
  //   path: "",
  //   icon: <RiShutDownLine />,
  // },
];

const dropdownMenus: MenuType[] = [
  {
    mainTitle: 'Dashboard',
    path: '/',
    mainIcon: <LuLayoutDashboard size={18} />,
  },
  {
    mainTitle: 'Smart Link',
    path: '/smart-link',
    mainIcon: <PiLinkDuotone size={18} />,
  },
  // {
  //   mainTitle: "Campaign",
  //   path: "",
  //   mainIcon: <PiFlagPennantDuotone size={18} />,
  //   subMenus: [
  //     {
  //       title: "Create New Campaign",
  //       path: "/createNewCampaign",
  //       icon: <HiOutlineDocumentReport />,
  //     },
  //     {
  //       title: "Manage Campaign",
  //       path: "/manageCampaign",
  //       icon: <MdOutlinePayments />,
  //     },
  //   ],
  // },
  {
    mainTitle: 'Offer Wall',
    path: '',
    mainIcon: <TbNavigationDiscount size={18} />,
    subMenus: [
      {
        title: 'All Offers',
        path: '/offerwall',
        icon: <TbNavigationDiscount />,
      },
      {
        title: 'Approved Offers',
        path: '/approved-offers',
        icon: <TbNavigationDiscount />,
      },
    ],
  },
  // {
  //   mainTitle: "Sources",
  //   path: "",
  //   mainIcon: <TbNavigationDiscount size={18} />,
  //   subMenus: [
  //     {
  //       title: "CPC Sources",
  //       path: "/cpcSources",
  //       icon: <HiOutlineDocumentReport />,
  //     },
  //     {
  //       title: "CPI/CPA Sources",
  //       path: "/cpiCpaSources",
  //       icon: <MdOutlinePayments />,
  //     },
  //   ],
  // },
  {
    mainTitle: 'Statistics',
    path: '',
    mainIcon: <IoBarChartOutline size={18} />,
    subMenus: [
      {
        title: 'Quick Report',
        path: '/quick-report',
        icon: <HiOutlineDocumentReport />,
      },
      {
        title: 'Conversion Report',
        path: '/conversion-report',
        icon: <HiOutlineDocumentReport />,
      },
      // {
      //   title: "Transaction Report",
      //   path: "/transactionReport",
      //   icon: <MdOutlinePayments />,
      // },
    ],
  },
  {
    mainTitle: 'Payment',
    path: '/payment',
    mainIcon: <MdPayment size={18} />,
  },
  {
    mainTitle: 'Postback URls',
    path: '/postbackURLs',
    mainIcon: <HiLink size={18} />,
  },
  // {
  //   mainTitle: "Payout History",
  //   path: "/payoutHistory",
  //   mainIcon: <RiSecurePaymentLine />,
  // },
  // {
  //   mainTitle: "Tracking",
  //   path: "/tracking",
  //   mainIcon: <CgTrack />,
  // },
  // {
  //   mainTitle: "Statistics",
  //   path: "/statistics",
  //   mainIcon: <IoBarChartOutline />,
  // },
  // {
  //   mainTitle: "Deposite",
  //   path: "/deposite",
  //   mainIcon: <RiLuggageDepositLine size={18} />,
  // },
  {
    mainTitle: 'Help Center',
    path: '',
    mainIcon: <TbProgressHelp size={18} />,
    subMenus: [
      {
        title: 'FAQ',
        path: '/faq',
        icon: <TbNavigationDiscount />,
      },
    ],
  },
];

export default function CustomSidebar({
  children,
  sidebarOpen,
  setSidebarOpen,
  dropDownOpen,
  setDropDownOpen,
  getDropdown,
  setGetDropdown,
}: SidebarProps) {
  const router = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  //for hover inside sx
  const [hover, setHover] = useState<string>('');

  // redux store
  // const themeDark = useAppSelector((state) => state.themeReducer.theme);
  // const dispatch = useDispatch<AppDispatch>();
  //   const auth = useAppSelector((state) => state.authReducer.auth);

  //for dropdown button handle
  function handleDropdownOpen(id: string) {
    if (dropDownOpen === id) {
      setDropDownOpen(null);
      setGetDropdown(null);
    }
    if (dropDownOpen !== id) {
      setDropDownOpen(id);
      setGetDropdown(id);
    }
  }
  const handleClick = (id: string) => {
    setDropDownOpen(id);
    handleDropdownOpen(id);
    setSidebarOpen(true);
  };

  const handleSidebar = () => {
    if (dropDownOpen) {
      setDropDownOpen(null);
    } else {
      setDropDownOpen(getDropdown);
    }
    setSidebarOpen(!sidebarOpen);
  };

  const handleRouteChange = (path: string) => {
    const screenWidth = window.screen.width;
    if (screenWidth < 600) {
      setSidebarOpen(false);
    }
    const isSpecialRoute =
      pathname === '/offerwall' ||
      pathname === '/approved-offers' ||
      pathname === '/quick-report';

    if (path === pathname && isSpecialRoute) {
      window.location.reload();
    }
    router(path);
  };

  //handle log out
  const handleLogout = () => {
    // cookies.remove("access-token");
    // dispatch(setAuth({}));
    router('/signin');
  };

  return (
    <Box
      component={'div'}
      sx={{
        display: 'flex',
        width: '100%',
        color: '#13183e',
        height: 'calc(100dvh - 50px)',
        backgroundColor: '#121622',
      }}
    >
      <Box
        component={'div'}
        onClick={handleSidebar}
        sx={
          sidebarOpen
            ? {
                backdropFilter: { xs: 'brightness(40%)', md: 'none' },
                width: { xs: '100%', md: '30%', lg: '20%' },
                position: { xs: 'absolute', md: 'static' },
                top: 45,
                left: 0,
                zIndex: 50,
                transition: { xs: 0, md: '.3s' },
              }
            : {
                backdropFilter: { xs: 'brightness(40%)', md: 'none' },
                width: { xs: 0, md: '8%', lg: '5%' },
                position: { xs: 'absolute', md: 'static' },
                top: 45,
                left: 0,
                zIndex: 50,
                transition: { xs: 0, md: '.3s' },
              }
        }
      >
        <Box
          component={'div'}
          onClick={(e) => e.stopPropagation()}
          sx={
            sidebarOpen
              ? {
                  backgroundColor: '#1c2437',
                  padding: '20px 10px 20px 10px',
                  minWidth: { xs: '70%', sm: '30%', md: '100%' },
                  maxWidth: { xs: '70%', sm: '30%', md: '100%' },
                  gap: '2px',
                  height: { xs: '95dvh', md: '100%' },
                  overflowY: 'scroll',
                  '&::-webkit-scrollbar': { display: 'none' },
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '.3s',
                }
              : {
                  backgroundColor: '#1c2437',
                  padding: { xs: '20px 0 20px 0', md: '20px 10px 20px 10px' },
                  maxWidth: { xs: 0, sm: 0, md: '100%' },
                  minWidth: { xs: 0, sm: 0, md: '100%' },
                  gap: '2px',
                  height: '100%',
                  overflowY: 'scroll',
                  '&::-webkit-scrollbar': { display: 'none' },
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '.3s',
                }
          }
        >
          {/* Profile info */}
          <Box
            component={'div'}
            sx={{
              display: { xs: `${sidebarOpen ? 'flex' : 'none'}`, md: 'flex' },
              flexDirection: 'column',
              mb: 4,
              alignItems: 'center',
              color: '#d8d8d8',
              transition: '.5s',
            }}
          >
            Image
            {/* {auth?.email ? (
              auth?.imageData?.imageUrl ? (
                <Image
                  onClick={() => handleRouteChange("/user-profile")}
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 50,
                    border: "2px dashed #3d475f",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  height={45}
                  width={45}
                  src={auth?.imageData?.imageUrl}
                  alt={auth?.imageData?.imageUrl}
                />
              ) : (
                <Box
                  onClick={() => handleRouteChange("/user-profile")}
                  component={"span"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 45,
                    width: 45,
                    borderRadius: 50,
                    background: "#007965",
                    color: "white",
                    fontSize: 18,
                    fontWeight: 500,
                    letterSpacing: 2,
                    border: "2px dashed #3d475f",
                    cursor: "pointer",
                  }}
                >
                  {auth?.name?.slice(0, 2).toUpperCase()}
                </Box>
              )
            ) : (
              <Image
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 50,
                  border: "2px dashed #3d475f",
                  objectFit: "cover",
                }}
                height={200}
                width={200}
                src={avatar}
                alt="user"
              />
            )} */}
            <Tooltip title={'user Name'} followCursor>
              <Typography
                variant="h4"
                sx={{
                  mt: 1,
                  fontSize: { xs: 18, md: 16 },
                  letterSpacing: '.1ch',
                  whiteSpace: 'nowrap',
                  opacity: `${sidebarOpen ? 1 : 0}`,
                }}
              >
                {("auth?.name uerufhrrgrrfs" ?? 'Guest').slice(0, 18)}
              </Typography>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '.8rem', md: '.7rem' },
                letterSpacing: '.1ch',
                fontWeight: '500',
                color: '#36a689',
                my: 1,
                opacity: `${sidebarOpen ? 1 : 0}`,
              }}
            >
              ID: {"auth?.userId" ?? 'guest123'}
            </Typography>
          </Box>

          {/* Top icon links */}
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              backgroundColor: '#293247',
              justifyContent: 'space-between',
              mb: 2,
              borderRadius: '4px',
              transition: '.5s',
            }}
          >
            {sidebarTopLinks.map((link:any, index:any) => (
              <Tooltip followCursor key={index} title={link.title}>
                <Box
                  component={'span'}
                  onClick={() => handleRouteChange(link.path)}
                  sx={
                    sidebarOpen
                      ? {
                          p: '10px',
                          fontSize: '20px',
                          color: '#36a689',
                          cursor: 'pointer',
                          width: '100%',
                          justifyContent: 'center',
                          '&:hover': {
                            color: '#ED7D31',
                          },
                        }
                      : {
                          display: `${link.path === '/' ? 'flex' : 'none'}`,
                          p: '10px',
                          fontSize: '20px',
                          color: '#36a689',
                          cursor: 'pointer',
                          width: '100%',
                          justifyContent: 'center',
                        }
                  }
                >
                  {link.icon}
                </Box>
              </Tooltip>
            ))}
            <Tooltip followCursor title={'Logout'}>
              <Box
                component={'span'}
                onClick={handleLogout}
                sx={
                  sidebarOpen
                    ? {
                        p: '10px',
                        fontSize: '20px',
                        color: '#36a689',
                        cursor: 'pointer',
                        width: '100%',
                        justifyContent: 'center',
                        '&:hover': {
                          color: '#ED7D31',
                        },
                      }
                    : {
                        // display: `${pathname === "/dashboard" ? "flex" : "none"}`,
                        display: 'none',
                        p: '10px',
                        fontSize: '20px',
                        color: '#36a689',
                        cursor: 'pointer',
                        width: '100%',
                        justifyContent: 'center',
                      }
                }
              >
                <RiShutDownLine />
              </Box>
            </Tooltip>
          </Box>

          {/* All Menus */}
          {dropdownMenus?.map((menu: MenuType, index: number) =>
            menu.subMenus ? (
              <Box component={'div'} key={index}>
                <Box
                  component={'div'}
                  onMouseEnter={() => setHover(menu.mainTitle)}
                  onMouseLeave={() => setHover('')}
                  onClick={() => handleClick(menu.mainTitle)}
                  sx={
                    sidebarOpen
                      ? {
                          display: 'flex',
                          height: '35px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: `${
                            hover === menu.mainTitle ||
                            dropDownOpen === menu.mainTitle
                              ? '#3d475f63'
                              : ''
                          }`,
                          color: 'white',
                          // marginLeft: `${hover === menu.mainTitle ? '6px' : 0}`,
                          gap: '10px',
                          textTransform: 'capitalize',
                          padding: '8px',
                          borderRadius: '4px',
                          transition: '.2s',
                          width: '100%',
                          cursor: 'pointer',
                        }
                      : {
                          display: 'flex',
                          height: '35px',
                          color: 'white',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: `${
                            hover === menu.mainTitle ? '#3d475f63' : ''
                          }`,
                          textTransform: 'capitalize',
                          padding: '8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: '.2s',
                        }
                  }
                >
                  <Box
                    component={'span'}
                    sx={{
                      display: 'flex',
                      whiteSpace: 'nowrap',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box
                      component={'span'}
                      sx={{
                        display: {
                          xs: `${sidebarOpen ? 'block' : 'none'}`,
                          md: 'block',
                        },
                        fontSize: 18,
                      }}
                    >
                      {menu.mainIcon}
                    </Box>
                    <Typography
                      variant="body2"
                      fontSize={13}
                      fontWeight={400}
                      sx={
                        sidebarOpen
                          ? {
                              display: 'block',
                            }
                          : { display: 'none' }
                      }
                    >
                      {menu.mainTitle}
                    </Typography>
                  </Box>
                  <Box
                    component={'span'}
                    sx={
                      dropDownOpen !== menu.mainTitle || !sidebarOpen
                        ? {
                            display: `${sidebarOpen ? 'block' : 'none'}`,
                            transition: '.2s',
                          }
                        : {
                            display: `${sidebarOpen ? 'block' : 'none'}`,
                            transform: 'rotate(-90deg)',
                            transition: '.2s',
                          }
                    }
                  >
                    {menu.subMenus && sidebarOpen && (
                      <RiArrowRightSLine size={18} />
                    )}
                  </Box>
                </Box>
                <Box
                  component={'div'}
                  sx={
                    dropDownOpen === menu.mainTitle
                      ? {
                          height: 'fit-content',
                          transformOrigin: 'top',
                          backgroundColor: '#121622',
                          padding: '10px 0 10px 0',
                          transition: '.3s',
                        }
                      : {
                          height: 0,
                          transformOrigin: 'top',
                          transition: '.3s',
                        }
                  }
                >
                  {menu.subMenus.map((submenu, index) => (
                    <Box
                      component={'span'}
                      onClick={() => handleRouteChange(submenu.path)}
                      onMouseEnter={() => setHover(submenu.title)}
                      onMouseLeave={() => setHover('')}
                      key={index}
                      sx={
                        dropDownOpen === menu.mainTitle
                          ? {
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: `${
                                pathname === submenu.path ||
                                hover === submenu.title
                                  ? '#ED7D31'
                                  : 'white'
                              }`,
                              textTransform: 'capitalize',
                              letterSpacing: '.1ch',
                              padding: '8px',
                              marginLeft: '20px',
                              borderRadius: '4px',
                              whiteSpace: 'nowrap',
                              transition: '.2s',
                              cursor: 'pointer',
                            }
                          : {
                              display: 'none',
                              alignItems: 'center',
                              gap: '10px',
                              color: `${
                                pathname === submenu.path ||
                                hover === submenu.title
                                  ? '#ED7D31'
                                  : 'white'
                              }`,
                              textTransform: 'capitalize',
                              letterSpacing: '.1ch',
                              padding: '8px',
                            }
                      }
                    >
                      <Typography
                        variant="body2"
                        fontSize={12}
                        fontWeight={400}
                      >
                        {submenu.title}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box
                component={'span'}
                onClick={() => handleRouteChange(menu.path)}
                onMouseEnter={() => setHover(menu.mainTitle)}
                onMouseLeave={() => setHover('')}
                key={index}
                sx={
                  sidebarOpen
                    ? {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        height: '35px',
                        color: `${
                          pathname === menu.path ? '#e27332' : 'white'
                        }`,
                        marginLeft: `${
                          hover === menu.mainTitle && pathname !== menu.path
                            ? '6px'
                            : 0
                        }`,
                        textTransform: 'capitalize',
                        letterSpacing: '.1ch',
                        // backgroundColor: `${pathname === menu.path || hover === menu.mainTitle ? "#3D30A2" : ""
                        //   }`,
                        padding: '8px',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                        transition: '.2s',
                        cursor: 'pointer',
                      }
                    : {
                        display: 'flex',
                        color: `${
                          pathname === menu.path ? '#e27332' : 'white'
                        }`,
                        alignItems: 'center',
                        height: '35px',
                        justifyContent: 'center',
                        backgroundColor: `${
                          pathname === menu.path || hover === menu.mainTitle
                            ? '#3d475f63'
                            : ''
                        }`,
                        padding: '8px',
                        borderRadius: '4px',
                        transition: '.2s',
                        cursor: 'pointer',
                      }
                }
              >
                <Box
                  component={'span'}
                  sx={{
                    display: {
                      xs: `${sidebarOpen ? 'block' : 'none'}`,
                      md: 'block',
                    },
                    fontSize: 18,
                  }}
                >
                  {menu.mainIcon}
                </Box>
                <Typography
                  variant={'body2'}
                  fontSize={13}
                  sx={sidebarOpen ? { display: 'block' } : { display: 'none' }}
                >
                  {menu.mainTitle}
                </Typography>
              </Box>
            ),
          )}

        </Box>
      </Box>
      <Box
        component={'main'}
        sx={{
          width: '100%',
          height: '100%',
          pb: 10,
          pt: 1,
          px: { xs: 1, md: 2 },
          overflowY: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
