import React, { useState } from "react";
import OpportunityCard from "./OpportunityCard";
import { filterOpportunitiesBySearch } from "../lib/businessLogic";

export default function OpportunityList({ opportunities }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOpportunities = filterOpportunitiesBySearch(
    opportunities,
    searchTerm,
  );
  const displayed = filteredOpportunities.slice(0, 9);

  return (
    <section className="opportunities-section">
      <div className="section-container">
        <h2>Available Opportunities</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title, organization, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {filteredOpportunities.length === 0 ? (
          <p className="empty-state">
            {searchTerm
              ? "No opportunities match your search."
              : "No opportunities available."}
          </p>
        ) : (
          <>
            <p className="results-count">
              Found {filteredOpportunities.length} opportunity(ies) — showing{" "}
              {displayed.length}
            </p>
            <div className="opportunities-grid">
              {displayed.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id || opportunity.title}
                  opportunity={opportunity}
                  isLocal={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
