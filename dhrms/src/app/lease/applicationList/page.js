import { useState, useEffect } from 'react';
import { Paper, Button, Container, Typography, Tab, Tabs, Box, Avatar } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import PropertiesTable from '@components/PropertiesTable';
import ApplicationTable from '@components/ApplicationTable';

const mockProperties = [
    { id: 1, name: 'Property 1', address: '123 Main St', image: '/path/to/image1.jpg', status: 'Available' },
    { id: 2, name: 'Property 2', address: '456 Maple Ave', image: '/path/to/image2.jpg', status: 'Occupied' },
    // Add more properties as needed...
  ];
  
  const mockApplications = [
    { id: 1, name: 'Applicant 1', dob: '1990-01-01', age: 31, email: 'applicant1@example.com', phoneNumber: '123-456-7890', occupants: 2, leaseStart: '2022-01-01', leaseEnd: '2022-12-31', propertyId: 1 },
    { id: 2, name: 'Applicant 2', dob: '1985-01-01', age: 36, email: 'applicant2@example.com', phoneNumber: '234-567-8901', occupants: 1, leaseStart: '2022-02-01', leaseEnd: '2023-01-31', propertyId: 2 },
    // Add more applications as needed...
  ];

const ApplicationList = () => {
  const [value, setValue] = useState(0);
  const [applications, setApplications] = useState([]);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch properties and applications from the API when the component mounts
    setTimeout(() => {
      setProperties(mockProperties);
      setApplications(mockApplications);
    }, 1000); // Simulate network delay
  }, []);

//   useEffect(() => {
//     // Fetch properties and applications from the API when the component mounts
//     axios.get('/api/properties').then((response) => {
//       setProperties(response.data);
//     }).catch((error) => {
//       setError(error.message);
//     });
//     axios.get('/api/applications').then((response) => {
//       setApplications(response.data);
//     }).catch((error) => {
//       setError(error.message);
//     });
//   }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleApprove = (applicationId) => {
    // Update the application status to "approved" and redirect to the lease creation page
    axios.put(`/api/applications/${applicationId}`, { status: 'approved' }).then(() => {
      router.push('/lease-create');
    }).catch((error) => {
      setError(error.message);
    });
  };

  const handleDeny = (applicationId) => {
    // Update the application status to "denied"
    axios.put(`/api/applications/${applicationId}`, { status: 'denied' }).catch((error) => {
      setError(error.message);
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

    return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Applications Pending" />
          <Tab label="Applications Approved" />
          <Tab label="Applications Denied" />
        </Tabs>
      </Box>
      <PropertiesTable properties={properties} />
      <ApplicationTable value={value} index={0} title="Applications Pending" applications={applications} properties={properties} onApprove={handleApprove} onDeny={handleDeny} />
      <ApplicationTable value={value} index={1} title="Applications Approved" applications={applications} properties={properties} onApprove={handleApprove} onDeny={handleDeny} />
      <ApplicationTable value={value} index={2} title="Applications Denied" applications={applications} properties={properties} onApprove={handleApprove} onDeny={handleDeny} />
    </Box>
  );
};

export default ApplicationList;