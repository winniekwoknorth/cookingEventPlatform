// src/components/OrganizationList.jsx
import React, { useState, useEffect } from 'react';
import { listOrganizations } from '../api/eventbriteApi';
import CreateEventForm from './CreateEventForm'; // Import the form component

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await listOrganizations();
        setOrganizations(data.organizations);

        // Assuming you want to select the first organization by default
        if (data.organizations.length > 0) {
          setSelectedOrgId(data.organizations[0].id);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchOrganizations();
  }, []);

  return (
    <div>
      <h2>Organizations</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org.id}>
              <td>{org.id}</td>
              <td>{org.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pass the selected organization ID to the form component */}
      {selectedOrgId && <CreateEventForm organizationId={selectedOrgId} />}
    </div>
  );
};

export default OrganizationList;
