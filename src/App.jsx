import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OpportunityList from "./components/OpportunityList";
import AddOpportunityForm from "./components/AddOpportunitiesForm";
import MyOpportunities from "./components/MyOpportunities";
import { fetchVolunteerOpportunities } from "./lib/api";
import {
  getLocalOpportunities,
  addOpportunityToStorage,
  deleteOpportunityFromStorage,
} from "./lib/localStorage";
import {
  getTotalOpportunities,
  countRemoteOpportunities,
  normalizeOpportunities,
} from "./lib/businessLogic";

export default function App() {
  const [apiOpportunities, setApiOpportunities] = useState([]);
  const [localOpportunities, setLocalOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Load local opportunities from storage
      const localOpps = getLocalOpportunities();
      setLocalOpportunities(localOpps);

      // Fetch API opportunities and normalize data
      const apiOppsRaw = await fetchVolunteerOpportunities();
      const apiOpps = Array.isArray(apiOppsRaw) ? apiOppsRaw : [];
      const normalized = normalizeOpportunities(apiOpps);
      setApiOpportunities(normalized);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Unable to load volunteer opportunities");
      // Still try to load local opportunities even if API fails
      const localOpps = getLocalOpportunities();
      setLocalOpportunities(localOpps);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOpportunity = (formData) => {
    const newOpportunity = addOpportunityToStorage(formData);
    setLocalOpportunities((prev) => [...prev, newOpportunity]);
  };

  const handleDeleteOpportunity = (id) => {
    deleteOpportunityFromStorage(id);
    setLocalOpportunities((prev) => prev.filter((opp) => opp.id !== id));
  };

  // Calculate statistics
  const totalOpps = getTotalOpportunities(apiOpportunities, localOpportunities);
  const remoteCount = countRemoteOpportunities([
    ...apiOpportunities,
    ...localOpportunities,
  ]);

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <section className="stats-bar">
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-label">Total Opportunities</span>
              <span className="stat-value">{totalOpps}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Remote-friendly</span>
              <span className="stat-value">{remoteCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Saved locally</span>
              <span className="stat-value">{localOpportunities.length}</span>
            </div>
          </div>
        </section>

        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button className="retry-btn" type="button" onClick={loadData}>
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <section className="loading-container">
            <div className="spinner" />
            <p>Loading volunteer opportunities…</p>
          </section>
        ) : (
          <>
            <div className="form-panel">
              <AddOpportunityForm onAdd={handleAddOpportunity} />
            </div>

            <OpportunityList opportunities={apiOpportunities} />

            <MyOpportunities
              opportunities={localOpportunities}
              onDelete={handleDeleteOpportunity}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
