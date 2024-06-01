'use client';

import React, { SetStateAction, useState } from 'react';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { BsQuestionLg } from 'react-icons/bs';
import { TbHomeSignal, TbNavigationDiscount } from 'react-icons/tb';

import { Box, Tooltip, Typography } from '@mui/material';
import { LiaEdit } from 'react-icons/lia';
import { LuLayoutDashboard } from 'react-icons/lu';
import { RiArrowRightSLine, RiShutDownLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomHeader from '../CustomHeader/CustomHeader';

type SingleMenuType = {
  title: string;
  path: String;
  icon: React.JSX.Element;
};
type NestedMenuType = {
  title: string;
  path: string;
};
type SubMenuType = {
  title: string;
  path: string;
  nestedSubMenus?: NestedMenuType[];
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
  setSidebarOpen: React.Dispatch<SetStateAction<boolean | null>>;
  dropDownOpen: string | null;
  setDropDownOpen: React.Dispatch<SetStateAction<string | null>>;
  getDropdown: string | null;
  setGetDropdown: React.Dispatch<SetStateAction<string | null>>;
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
    mainTitle: 'Inventory Management',
    path: '/smart-link',
    mainIcon: <TbNavigationDiscount />,
    subMenus: [
      {
        title: 'All Offers',
        path: '/firewall',
      },
      {
        title: 'Products',
        path: '',
        nestedSubMenus: [
          {
            title: 'Product List',
            path: '/inventory/product-list',
          },
          {
            title: 'Service',
            path: '/inventory/service',
          },
          {
            title: 'Add Product',
            path: '/inventory/add-product',
          },
        ],
      },


      // {
      //   title: 'Nested 2',
      //   path: '',
      //   nestedSubMenus: [
      //     {
      //       title: '1',
      //       path: '/offerwall',
      //     },
      //     {
      //       title: '2',
      //       path: '/approved-offers',
      //     },
      //   ],
      // },
      // {
      //   title: 'Nested 3',
      //   path: '',
      //   nestedSubMenus: [
      //     {
      //       title: '1',
      //       path: '/offerwall',
      //     },
      //     {
      //       title: '2',
      //       path: '/approved-offers',
      //     },
      //   ],
      // },
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
  const [nestedDropOpen, setNestedDropOpen] = useState<string | null>(null);

  // redux store
  // const themeDark = useAppSelector((state) => state.themeReducer.theme);
  // const dispatch = useDispatch<AppDispatch>();
  //   const auth = useAppSelector((state) => state.authReducer.auth);

  //for dropdown button handle
  function handleDropdownOpen(id: string) {
    if (dropDownOpen === id) {
      setDropDownOpen(null);
      setNestedDropOpen(null);
      setGetDropdown(null);
    }
    if (dropDownOpen !== id) {
      setDropDownOpen(id);
      setGetDropdown(id);
    }
  }

  function handleNestedDropdownOpen(id: string) {
    if (nestedDropOpen === id) {
      setNestedDropOpen(null);
      // setGetDropdown(null);
    }
    if (nestedDropOpen !== id) {
      setNestedDropOpen(id);
      // setGetDropdown(id);
    }
  }

  const handleClick = (id: string) => {
    setDropDownOpen(id);
    handleDropdownOpen(id);
    setSidebarOpen(true);
  };

  const handleNestedMenuClick = (id: string) => {
    setNestedDropOpen(id);
    handleNestedDropdownOpen(id);
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
      className="bg-white dark:bg-boxdark"
      component={'div'}
      sx={{
        display: 'flex',
        width: '100%',
        // color: '#13183e',
        height: '100vh',
        // backgroundColor: '#121622',
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
                {('auth?.name uerufhrrgrrfs' ?? 'Guest').slice(0, 18)}
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
              ID: {'auth?.userId' ?? 'guest123'}
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
            {sidebarTopLinks.map((link: any, index: any) => (
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
                  {menu.subMenus.map((submenu, index) =>
                    submenu.nestedSubMenus ? (
                      <Box component={'div'} key={index}>
                        <Box
                          component={'div'}
                          onMouseEnter={() => setHover(submenu.title)}
                          onMouseLeave={() => setHover('')}
                          onClick={() => handleNestedMenuClick(submenu?.title)}
                          sx={
                            sidebarOpen
                              ? {
                                  display:
                                    dropDownOpen === menu.mainTitle
                                      ? 'flex'
                                      : 'none',
                                  height: '35px',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  backgroundColor: `${
                                    hover === submenu.title ? '#3d475f63' : ''
                                  }`,
                                  color: 'white',
                                  // marginLeft: `${hover === menu.mainTitle ? '6px' : 0}`,
                                  gap: '10px',
                                  textTransform: 'capitalize',
                                  padding: '8px',
                                  borderRadius: '4px 0 0 4px',
                                  ml: '20px',
                                  transition: '.2s',
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
                            {/* <Box
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
                            </Box> */}
                            <Box
                              component={'span'}
                              sx={
                                nestedDropOpen !== submenu.title || !sidebarOpen
                                  ? {
                                      display: `${
                                        sidebarOpen ? 'block' : 'none'
                                      }`,
                                      transition: '.2s',
                                    }
                                  : {
                                      display: `${
                                        sidebarOpen ? 'block' : 'none'
                                      }`,
                                      transform: 'rotate(-90deg)',
                                      transition: '.2s',
                                    }
                              }
                            >
                              {submenu.title && sidebarOpen && (
                                <RiArrowRightSLine size={18} />
                              )}
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
                              {submenu.title}
                            </Typography>
                          </Box>
                          {/* <Box
                            component={'span'}
                            sx={
                              nestedDropOpen !== submenu.title || !sidebarOpen
                                ? {
                                    display: `${
                                      sidebarOpen ? 'block' : 'none'
                                    }`,
                                    transition: '.2s',
                                  }
                                : {
                                    display: `${
                                      sidebarOpen ? 'block' : 'none'
                                    }`,
                                    transform: 'rotate(-90deg)',
                                    transition: '.2s',
                                  }
                            }
                          >
                            {submenu.title && sidebarOpen && (
                              <RiArrowRightSLine size={18} />
                            )}
                          </Box> */}
                        </Box>
                        <Box
                          component={'div'}
                          sx={
                            nestedDropOpen === submenu.title &&
                            dropDownOpen !== null
                              ? {
                                  height: 'fit-content',
                                  transformOrigin: 'top',
                                  borderLeft: '1px solid #464646',
                                  ml: '40px',
                                  my: 1,
                                  backgroundColor: '#121622',
                                  padding: '2px 0 2px 0',
                                  transition: '.3s',
                                }
                              : {
                                  height: 0,
                                  transformOrigin: 'top',
                                  ml: '40px',
                                  // my:0,
                                  transition: '.3s',
                                }
                          }
                        >
                          {submenu.nestedSubMenus.map((nestedMenu, index) => (
                            <Box
                              component={'span'}
                              onClick={() => handleRouteChange(nestedMenu.path)}
                              onMouseEnter={() => setHover(nestedMenu.title)}
                              onMouseLeave={() => setHover('')}
                              key={index}
                              sx={
                                nestedDropOpen === submenu.title &&
                                dropDownOpen !== null
                                  ? {
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '10px',
                                      color: `${
                                        pathname === nestedMenu.path ||
                                        hover === nestedMenu.title
                                          ? '#ED7D31'
                                          : 'white'
                                      }`,
                                      textTransform: 'capitalize',
                                      letterSpacing: '.1ch',
                                      padding: '8px',
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
                                {nestedMenu.title}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ) : (
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
                    ),
                  )}
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
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          gap: 2,
          width: '100%',
          height: '100%',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <CustomHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          dropDownOpen={dropDownOpen}
          setDropDownOpen={setDropDownOpen}
        />
        <Box
          sx={{
            px: { xs: 1, md: 2 },
          }}
          component={'div'}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
