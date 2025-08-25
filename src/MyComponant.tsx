import React, { useState, useEffect } from 'react';
const baseUrl = import.meta.env.VITE_API_BASE_URL
// You might have a base URL defined elsewhere
// const baseUrl = 'https://your-api-endpoint.com';

interface DataState {
  data: string | null;
  loading: boolean;
  error: string | null;
}

const MyComponent: React.FC = () => {
  // Use a single state object to manage data, loading status, and errors
  const [apiState, setApiState] = useState<DataState>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      // Set loading to true before the API call
      setApiState({ ...apiState, loading: true, error: null });

      const response = await fetch(baseUrl + '/StudentSyncJob/Index');
      
      // Check for HTTP errors (e.g., 404, 500)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Read the response body as a string
      const result = await response.text(); 
      
      // Update the state with the fetched data
      setApiState({
        data: result,
        loading: false,
        error: null,
      });

    } catch (error) {
      // Handle network errors or other exceptions
      setApiState({
        data: null,
        loading: false,
        error: 'Error fetching data. Please try again later.',
      });
      console.error('Error fetching data:', error);
    }
  };

  // Use useEffect to call the function when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // The empty dependency array ensures this runs only once

  // Render based on the current state
  if (apiState.loading) {
    return <div>Loading...</div>;
  }

  if (apiState.error) {
    return <div>Error: {apiState.error}</div>;
  }

  // Display the fetched data
  return (
    <div>
      <h1>API Response:</h1>
      <h2>{apiState.data}</h2>
    </div>
  );
};

export default MyComponent;