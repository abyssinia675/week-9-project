// Local Storage helper functions for persisting user-created opportunities

const STORAGE_KEY = "userVolunteerOpportunities";

export const getLocalOpportunities = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

export const saveLocalOpportunities = (opportunities) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const addOpportunityToStorage = (opportunity) => {
  const existing = getLocalOpportunities();
  const newOpportunity = {
    ...opportunity,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    isLocal: true,
  };
  const updated = [...existing, newOpportunity];
  saveLocalOpportunities(updated);
  return newOpportunity;
};

export const deleteOpportunityFromStorage = (id) => {
  const existing = getLocalOpportunities();
  const updated = existing.filter((opp) => opp.id !== id);
  saveLocalOpportunities(updated);
};
