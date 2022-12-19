import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSender } from "../../config/ChatLogics";
import { ChatState } from "../../context/ChatProvider";
import ChatLoading from "./ChatLoading";
import ProfileModal from "./ProfileModal";
import UserListItem from "./UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      return toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        variant: "solid",
      });
    }

    try {
      setLoading(true);

      const response = await fetch(`profile/api/get-users?search=${search}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      return toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        variant: "solid",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const response = await fetch(
        `http://localhost:5000/chat/api/chat/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      // If the chat already inside 'chat' state, append it
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose(); // Close the side drawer
    } catch (error) {
      setLoadingChat(false);
      return toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
        variant: "solid",
      });
    }
  };

  return (
    <>
      {/* Chat Page UI */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        {/* Search User Section */}
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search" />
            <Text display={{ base: "none", md: "flex" }} paddingX="2.5">
              Search User
            </Text>
          </Button>
        </Tooltip>

        {/* App Name Section */}
        <Text fontSize="2xl" fontFamily="Work sans">
          FundGator Chat System
        </Text>

        {/* User Profile and Bell Icon Section */}
        <div>
          <Menu>
            <MenuButton p="1" className="notification-badge-container">
              <BellIcon fontSize="2xl" m="1" />

              {notification.length > 0 && (
                <span className="notification-badge">
                  {notification.length > 9 ? "9+" : notification.length}
                </span>
              )}
            </MenuButton>

            <MenuList>
              {!notification.length && <Text pl="2">No New Messages</Text>}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat[0]);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat[0].chatName}`
                    : `New Message from ${getSender(
                        user,
                        notif.chat[0].users
                      )}`}
                  {/* Change chat[0] to chat from server side */}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          
        </div>
      </Box>

      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody>
            {/* Search User */}
            <Box display="flex" pb="2">
              <Input
                placeholder="Search by name or email"
                mr="2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>

            {/* Polulate Search Results */}
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}

            {/* if the chat has been created, don't show the loading */}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;