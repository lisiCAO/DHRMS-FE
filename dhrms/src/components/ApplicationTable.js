import { Container, Typography } from '@mui/material';
import ApplicationCard from './ApplicationCard';

const ApplicationTable = (props) => {
    const { value, index, title, applications, properties, onApprove, onDeny } = props;

    return (
      <div hidden={value !== index}>
        {value === index && (
          <Container>
            <Typography variant="h6">{title}</Typography>
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} property={properties.find((property) => property.id === application.propertyId)} onApprove={() => onApprove(application.id)} onDeny={() => onDeny(application.id)} />
            ))}
          </Container>
        )}
      </div>
    );
  };


export default ApplicationTable;