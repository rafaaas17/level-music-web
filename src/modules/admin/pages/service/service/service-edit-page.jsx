import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const ServiceEditPage = () => {
  const { serviceId } = useParams();

  useEffect(() => {
    // Load service details using serviceId
    console.log('Loading service details for ID:', serviceId);
  }, [serviceId]);

  return (
    <div>
      <h1>Service Details</h1>
      {/* Render service details here */}
    </div>
  );
};
