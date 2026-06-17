// API service for fetching volunteer opportunities from Volunteer Connector API

export const fetchVolunteerOpportunities = async (searchParams = {}) => {
  try {
    let url = "https://www.volunteerconnector.org/api/search/";

    // Add query parameters if provided
    if (Object.keys(searchParams).length > 0) {
      const queryString = new URLSearchParams(searchParams).toString();
      url += `?${queryString}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const results = Array.isArray(data?.results)
      ? data.results
      : Array.isArray(data)
        ? data
        : [];

    return results;
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    throw error;
  }
};

export const searchOpportunities = async (query) => {
  return fetchVolunteerOpportunities({ query });
};
