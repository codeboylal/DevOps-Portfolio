// import React from 'react';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <h2>Sidebar</h2>
//       <ul>
//         <li>Dashboard</li>
//         <li>Courses</li>
//         <li>Purchased</li>
//         <li>Assignment</li>
//         <li>Accomplishments</li>
//         <li>Projects</li>
//         <li>Downloads</li>
//         <li>Settings</li>
//         <li>Support</li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';

const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><AssignmentIcon /></ListItemIcon>
          <ListItemText primary="Assignments" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><SupportIcon /></ListItemIcon>
          <ListItemText primary="Support" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
