import React from 'react'
import { IoMdHome } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
          <IoMdHome  className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>
        <ListItem>
          <ListItemPrefix>
          <IoSearchOutline  className="h-5 w-5" />
          </ListItemPrefix>
          Search
        </ListItem>
        <ListItem>
          <ListItemPrefix>
          <FiMessageCircle className="h-5 w-5" />
          </ListItemPrefix>
          Message
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
          <IoMdNotifications className="h-5 w-5"/>
          </ListItemPrefix>
           Notification
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default Sidebar
