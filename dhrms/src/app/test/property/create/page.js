'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postPropertyDetails } from '@/services/propertyService'; // 确保路径正确

const CreatePropertyPage = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postPropertyDetails({ address }, false); 
      console.log('Property Created:', response);
      setLoading(false);
      router.push('/test/property'); 
    } catch (error) {
      console.error('Error creating property:', error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Property</h1>
      <label>
        Address:
        <input type="text" name="address" value={address} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default CreatePropertyPage;
