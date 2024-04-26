import { Paper, Typography, Avatar, Button } from '@mui/material';

const ApplicationCard = ({ application }) => {
    return (
        <Paper elevation={3} style={{ margin: '10px 0', padding: '10px' }}>
          <Typography variant="h6">Rental Application</Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>{application.name}</Typography>
          </div>
          <Typography variant="body1">Date of Birth: {application.dob}</Typography>
          <Typography variant="body1">Age: {application.age}</Typography>
          <Typography variant="body1">Email: {application.email}</Typography>
          <Typography variant="body1">Phone Number: {application.phoneNumber}</Typography>
          <Typography variant="body1">Occupants: {application.occupants}</Typography>
          <Typography variant="body1">Lease Start Date: {application.leaseStart}</Typography>
          <Typography variant="body1">Lease End Date: {application.leaseEnd}</Typography>
          <div style={{ marginTop: '10px' }}>
            <Button variant="contained" color="primary" style={{marginRight: '10px' }} onClick={onApprove}>
              Approve
            </Button>
            <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={onDeny}>
              Deny
            </Button>
            <Button variant="outlined">
              Cancel
            </Button>
          </div>
        </Paper>
      );
    };


export default ApplicationCard;