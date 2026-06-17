import React from "react";
import OpportunityCard from "./OpportunityCard";

export default function MyOpportunities({ opportunities, onDelete }) {
  return (
    <section className="my-opportunities-section">
      <div className="section-container">
        <h2>My Opportunities ({opportunities.length})</h2>

        {opportunities.length === 0 ? (
          <div className="empty-state">
            <p>You haven't created any opportunities yet.</p>
            <p>Scroll up to create your first opportunity! 🚀</p>
          </div>
        ) : (
          <div className="opportunities-grid">
            {opportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onDelete={onDelete}
                isLocal={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
