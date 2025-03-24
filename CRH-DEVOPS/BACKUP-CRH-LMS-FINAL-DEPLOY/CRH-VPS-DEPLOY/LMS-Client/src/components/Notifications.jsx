// import React from 'react';

// const Notifications = () => {
//   return (
//     <div className="notifications">
//       <h2>Notifications</h2>
//       <ul>
//         <li>Well done! You have submitted your task of JavaScript - Chapter 1.</li>
//         <li>Your task is overdue for 13 hours and 25 minutes.</li>
//         {/* Add more notifications here */}
//       </ul>
//     </div>
//   );
// };

// export default Notifications;
import React from 'react';
import { Paper, Typography } from '@mui/material';

const Notifications = () => {
  return (
    <Paper elevation={2} style={{ padding: '16px' }}>
      <Typography variant="h6">Notifications</Typography>
      <Typography>Well done! You have submitted your tasks of JavaScript - Chapter 1</Typography>
      <Typography>Your task is overdue for 18 hours and 26 minutes</Typography>
    </Paper>
  );
};

export default Notifications;
