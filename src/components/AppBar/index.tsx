import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";

import { useAuth } from "@/context/auth";
import { useTasks } from "@/context/tasks";

interface AppBarProps {
  title: string;
  user?: any;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: 8,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function AppBar({ title, user }: AppBarProps) {
  const router = useRouter();
  const { isUserLogged, signOut, token } = useAuth();
  const { filterTasks } = useTasks();

  const isTasksPage = router.pathname === "/tasks";
  const shouldRenderBackButton = ["/signup", "/tasks/create"].includes(
    router.pathname
  );

  const handleSignOut = () => {
    signOut();

    router.push("/signin");
  };

  const handleSearch = (term: string) => {
    filterTasks(term);
  };

  return (
    <Box>
      <MuiAppBar position="static">
        <Toolbar>
          {shouldRenderBackButton && (
            <IconButton
              size="large"
              aria-label="Sair"
              edge="end"
              color="inherit"
              onClick={() => router.back()}
              sx={{ marginRight: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            {title}
          </Typography>
          {isTasksPage && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Pesquisar..."
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Search>
          )}
          {user && isTasksPage && (
            <IconButton
              size="large"
              aria-label="Sair"
              edge="end"
              color="inherit"
              onClick={handleSignOut}
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
