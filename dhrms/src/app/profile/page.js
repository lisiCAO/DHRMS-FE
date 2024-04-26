'use client';
import React, { useEffect, useState, useContext } from 'react';
import KeycloakContext from '@/context/KeycloakContext';

const Profile = () => {
  const keycloak = useContext(KeycloakContext);
  const [userInfo, setUserInfo] = useState({});


  useEffect(() => {
    if (keycloak?.authenticated) {
      keycloak.loadUserProfile()
        .then(profile => {
          setUserInfo(profile);
        })
        .catch(err => {
          console.error('Failed to load user profile', err);
        });
    } else {
      keycloak.login();
    }
  }, [keycloak]);

  if (!keycloak?.authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {userInfo && (
        <Card sx={{ maxWidth: 345 }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {userInfo.firstName} {userInfo.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Username: {userInfo.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Email: {userInfo.email}
            </Typography>
        </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
