import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import { ChatState } from "../../context/ChatProvider";
import UserBadgeItem from "./UserAvatar/UserBadgeItem";
import UserListItem from "./UserAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { user, selectedChat, setSelectedChat } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleRemove = async (removeUser) => {
    // Check if group admin id !== logged in user id and user id who is trying to remove !== logged in user id
    if (
      selectedChat.groupAdmin._id !== user.user._id &&
      removeUser._id !== user._id
    ) {
      return toast({
        title: "Only admins can remove someone!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
    }
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/chat/api/remove-user",
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: selectedChat._id,
            userId: removeUser._id,
          }),
        }
      );
      const data = await response.json();

      // If logged in user removed himself or left the group
      removeUser._id === user.user._id
        ? setSelectedChat()
        : setSelectedChat(data);
      setFetchAgain(!fetchAgain); // Fetching all the chat again
      fetchMessages(); // All the messages will be refreshed
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return toast({
        title: "Error Occured!",
        description: "Failed to remove the user!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
    }
  };

  const handleAddUser = async (addUser) => {
    // If the user already in the group
    if (selectedChat.users.find((u) => u._id === addUser._id)) {
      return toast({
        title: "User Already in group!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
    }

    // Check if the user admin or not
    if (selectedChat.groupAdmin._id !== user.user._id) {
      return toast({
        title: "Only admins can add someone!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/chat/api/add-user", {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: selectedChat._id,
          userId: addUser._id,
        }),
      });
      const data = await response.json();

      setSelectedChat(data);
      setFetchAgain(!fetchAgain); // Fetching all the chat again
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return toast({
        title: "Error Occured!",
        description: "Failed to add the user!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
    }
  };

  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }

    try {
      setRenameLoading(true);

      const response = await fetch("http://localhost:5000/chat/api/rename", {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: selectedChat._id,
          chatName: groupChatName,
        }),
      });
      const data = await response.json();

      setSelectedChat(data);
      setFetchAgain(!fetchAgain); // Fetching all the chat again
      setRenameLoading(false);
    } catch (error) {
      setRenameLoading(false);
      return toast({
        title: "Error Occured!",
        description: "Failed to rename group chat!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "solid",
      });
    }

    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query || query === "") {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/profile/api/get-users?search=${search}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();

      setLoading(false);
      setSearchResults(data);
    } catch (error) {
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

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader
            display="flex"
            justifyContent="center"
            fontSize="35px"
            fontFamily="Work sans"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <p className="fs-3">Group Members</p>
            <Box w="100%" display="flex" flexWrap="wrap" pb="3">
              {selectedChat.users.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
            </Box>
            {selectedChat.groupAdmin._id === user.user._id ? (
              <>
                <FormControl display="flex">
                  <Input
                    placeholder="Chat Name"
                    mb="3"
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                  />
                  <Button
                    variant="solid"
                    colorScheme="teal"
                    ml={1}
                    isLoading={renameLoading}
                    onClick={handleRename}
                  >
                    Update
                  </Button>
                </FormControl>

                <FormControl>
                  <Input
                    placeholder="Add User to group"
                    mb="1"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </FormControl>

                {loading ? (
                  <Spinner size="lg" />
                ) : (
                  searchResults?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleAddUser(user)}
                    />
                  ))
                )}
              </>
            ) : null}
          </ModalBody>

          <ModalFooter>
            {selectedChat.groupAdmin._id === user.user._id ? (
              <Button colorScheme="red" onClick={() => handleRemove(user.user)}>
                Delete Group
              </Button>
            ) : (
              ""
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
