"use client";
import React, { useEffect, useState } from "react";
import { fetchLeasesList } from "@/services/leaseService";
import { List, ListItem, ListItemText, Paper, Typography, Button, ListItemSecondaryAction, Checkbox } from "@mui/material";
import { useRouter } from 'next/navigation';
const LeaseList = () => {
  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedLeases, setSelectedLeases] = useState(new Set());
  const router = useRouter();
  useEffect(() => {
    const fetchLeases = async () => {
      setLoading(true);
      try {
        const data = await fetchLeasesList(false);
        setLeases(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch leases");
        setLoading(false);
        console.error(err);
      }
    };

    fetchLeases();
  }, []);

  const handleNavigateToDetail = (leaseId) => {
    router.push(`/test/leases/${leaseId}`);
  };

  const handleDeleteSelected = async () => {
    setLoading(true);
    try {
      await deleteMultipleLeases([...selectedLeases]);
      setSelectedLeases(new Set()); // Reset selection
      // Optionally, fetch the list again to update the UI
      const data = await fetchLeasesList(false);
      setLeases(data);
    } catch (err) {
      setError('Failed to delete selected leases');
      console.error(err);
    }
    setLoading(false);
  };

  const handleToggle = (leaseId) => {
    const newSelectedLeases = new Set(selectedLeases);
    if (newSelectedLeases.has(leaseId)) {
      newSelectedLeases.delete(leaseId);
    } else {
      newSelectedLeases.add(leaseId);
    }
    setSelectedLeases(newSelectedLeases);
  };

  return (
    <Paper style={{ margin: "16px", padding: "16px" }}>
      <Typography variant="h4" style={{ marginBottom: "16px" }}>
        Lease List
      </Typography>
      {loading ? (
        <Typography>Loading leases...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleDeleteSelected}
            disabled={selectedLeases.size === 0}
            style={{ marginBottom: "16px" }}
          >
            Delete Selected
          </Button>
          <List>
            {leases.map((lease) => (
              <ListItem key={lease.id} button onClick={() => handleNavigateToDetail(lease.id)}>
                <ListItemText
                  primary={`Lease ID: ${lease.id} - Tenant ID: ${lease.tenantUserId}`}
                  secondary={`Start Date: ${lease.startDate} - End Date: ${lease.endDate} - Status: ${lease.leaseStatus}`}
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={() => handleToggle(lease.id)}
                    checked={selectedLeases.has(lease.id)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Paper>
  );
};

export default LeaseList;
