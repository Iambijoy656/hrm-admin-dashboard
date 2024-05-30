
import React from "react";
import { LiaUserCogSolid } from "react-icons/lia";
import { TbMenu2 } from "react-icons/tb";
import { CgMenuLeft } from "react-icons/cg";
import { Dispatch, SetStateAction, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import avatar from "../../public/pngegg.png";
import { GoScreenFull } from "react-icons/go";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { MdLogout, MdOutlineLogin } from "react-icons/md";



type HeaderProps = {
  sidebarOpen: boolean | null;
  setSidebarOpen: Dispatch<SetStateAction<boolean | null>>;
  dropDownOpen: string | null;
  setDropDownOpen: Dispatch<SetStateAction<string | null>>;
  getDropdown: string | null;
};

export default function CustomHeader({
  sidebarOpen,
  setSidebarOpen,
  dropDownOpen,
  setDropDownOpen,
  getDropdown,
}: HeaderProps) {
//   const router = useRouter();
//   const apiSecure = ApiJWT();
  // const [badgeOpen, setBadgeOpen] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
//   const { authLoading } = useAuth();
//   const cookies = React.useMemo(() => new Cookies(), []);

  //for redux state manage
//   const auth = useAppSelector((state) => state.authReducer.auth);
//   const themeDark = useAppSelector((state) => state.themeReducer.theme);

  //for profile manu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAnchorEl = Boolean(anchorEl);



  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchorEl = () => {
    setAnchorEl(null);
  };

  const handleSidebar = () => {
    if (dropDownOpen) {
      setDropDownOpen(null);
    } else {
      setDropDownOpen(getDropdown);
    }
    setSidebarOpen(!sidebarOpen);
  };

//   const handleTheme = () => {
//     if (themeDark === "false") {
//       dispatch(themeState("true"));
//     } else {
//       dispatch(themeState("false"));
//     }
//   };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  //handle log out
//   const handleLogout = () => {
//     cookies.remove("access-token");
//     dispatch(setAuth({}));
//     router.push("/signin");
//     handleClose();
//   };

  //full screen view
  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <Box
      component={"header"}
      sx={{
        backgroundColor: "#121622",
        color: "white",
        position: "sticky",
        top: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        padding: "0 10px",
        boxShadow: "0px 7px 18px -15px rgba(0, 0, 0, 0.51)",
        zIndex: 100,
        transition: ".3s",
      }}
    >
      <Box
        onClick={handleSidebar}
        sx={{
          display: "flex",
          columnGap: "15px",
          alignItems: "center",
        }}
      >
        <Tooltip title="Collapse sidebar" placement="right">
          <Box
            component={"span"}
            sx={{
              fontSize: {
                xs: 26,
                md: 28,
                lg: 28,
                cursor: "pointer",
                padding: 2,
              },
            }}
          >
            {sidebarOpen ? <TbMenu2 /> : <CgMenuLeft />}
          </Box>
        </Tooltip>
      </Box>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: { xs: 0, md: "12px" },
        }}
      >
        <Box
          component={"div"}
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            color: "white",
            gap: 1,
          }}
        >
          <Box component={"span"} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              Earnings :
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 12, color: "#ED7D31" }}>
               "0.00"
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem style={{ backgroundColor: "gray" }} />
          <Box component={"span"} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ fontSize: 12 }}>
              Balance :
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 12, color: "#ED7D31" }}>
              ${ "0.00"}
            </Typography>
          </Box>
        </Box>
        {/* <Search themeDark={themeDark} /> */}
        {/* <Tooltip title="Theme" placement="bottom">
          <Box component={"div"}>
            <IconButton
              // for theme toggle
              // onClick={handleTheme}
              // for modal open
              onClick={handleOpen}
              sx={{ fontSize: { xs: "14px", md: "20px" }, color: "white" }}
              aria-label="theme"
            >
              {themeDark === "false" ? <HiOutlineSun /> : <BsMoonStars />}
            </IconButton>
            <ModalDashboard open={open} handleClose={handleClose} />
          </Box>
        </Tooltip> */}
        <Tooltip title="Full screen" placement="bottom" onClick={handleFullScreen}>
          <IconButton
            sx={{ fontSize: { xs: 20, md: 22 }, color: "white" }}
            aria-label="delete"
          >
            <GoScreenFull />
          </IconButton>
        </Tooltip>
        {/* <Notification /> */}
        {/* <Tooltip onClick={handleClick} title="Profile" placement="bottom">
          <Box
            sx={{
              backgroundColor: "#1C2437",
              borderRadius: "25px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              cursor: "pointer",
              ml: 1.5,
              pl: 0.5,
              pr: { xs: 0.5, md: 1.5 },
              py: 0.5,
            }}
          >
            {auth?.email ? (
              auth?.imageData?.imageUrl ? (
                <Image
                  style={{ objectFit: "cover", height: 30, minWidth: 30, borderRadius: "50%" }}
                  height={30}
                  width={30}
                  src={auth?.imageData?.imageUrl}
                  alt={auth?.imageData?.imageUrl}
                />
              ) : (
                <Box
                  component={"span"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 30,
                    width: 30,
                    borderRadius: "50%",
                    background: "#007965",
                    color: "white",
                  }}
                >
                  {auth?.name?.slice(0, 2).toUpperCase()}
                </Box>
              )
            ) : (
              <Image
                style={{ objectFit: "cover", height: 30, width: 30 }}
                height={30}
                width={30}
                src={avatar}
                alt="user"
              />
            )}
            <Box
              component={"span"}
              sx={{
                fontSize: { xs: 14, md: 20 },
                display: { xs: "none", md: "block" },
              }}
            >
              <LiaUserCogSolid />
            </Box>
          </Box>
        </Tooltip> */}
        {/* <Menu
          disableScrollLock={true}
          anchorEl={anchorEl}
          id="account-menu"
          open={openAnchorEl}
          onClose={handleCloseAnchorEl}
          onClick={handleCloseAnchorEl}
          PaperProps={
            themeDark === "true"
              ? {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  color: "lightGray",
                  backgroundColor: "#1C2437",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 25,
                    height: 25,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "#1C2437",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }
              : {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  color: "#131926",
                  backgroundColor: "#f1f1f1",
                  mt: 1.5,
                  boxShadow: "2px 4px 5px .5px rgba(0,0,0,0.18)",
                  "& .MuiAvatar-root": {
                    width: 25,
                    height: 25,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "#f1f1f1",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }
          }
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            sx={
              themeDark === "true"
                ? {
                  display: "flex",
                  gap: 1,
                  fontSize: ".8rem",
                  letterSpacing: ".1ch",
                  mx: 1,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#7752FE",
                  },
                }
                : {
                  mx: 1,
                  borderRadius: 1,
                  display: "flex",
                  gap: 1,
                  fontSize: ".8rem",
                  letterSpacing: ".1ch",
                  backgroundColor: "#E7E7E7",
                }
            }
            onClick={() => {
              handleClose(), router.push("/user-profile");
            }}
          >
            {auth?.email ? (
              auth?.imageData?.imageUrl ? (
                <Image
                  style={{ objectFit: "cover", height: 30, width: 30, borderRadius: "50%" }}
                  height={30}
                  width={30}
                  src={auth?.imageData?.imageUrl}
                  alt={auth?.imageData?.imageUrl}
                />
              ) : (
                <Box
                  component={"span"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 30,
                    width: 30,
                    borderRadius: "50%",
                    background: "#007965",
                    color: "white",
                  }}
                >
                  {auth?.name?.slice(0, 2).toUpperCase()}
                </Box>
              )
            ) : (
              <Avatar />
            )}
            <Box component={"div"}>
              <Typography variant="body2">{auth?.name}</Typography>
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {auth?.email}
              </Typography>
            </Box>
          </MenuItem>
          <Divider />
          
          {auth?.email ? (
            <MenuItem
              sx={
                themeDark === "true"
                  ? {
                    fontSize: ".8rem",
                    "&:hover": {
                      backgroundColor: "#7752FE",
                    },
                  }
                  : {
                    fontSize: ".8rem",
                  }
              }
              onClick={handleLogout}
            >
              <ListItemIcon>
                <MdLogout color={themeDark === "true" ? "#3EC1A1" : "#7752FE"} size={20} />
              </ListItemIcon>
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          ) : (
            <MenuItem
              sx={
                themeDark === "true"
                  ? {
                    fontSize: ".8rem",
                    "&:hover": {
                      backgroundColor: "#7752FE",
                    },
                  }
                  : {
                    fontSize: ".8rem",
                  }
              }
              onClick={() => router.push("/signin")}
            >
              <ListItemIcon>
                <MdOutlineLogin color={themeDark === "true" ? "#3EC1A1" : "#7752FE"} size={20} />
              </ListItemIcon>
              Login
            </MenuItem>
          )}
        </Menu> */}
      </Box>
    </Box>
  );
}