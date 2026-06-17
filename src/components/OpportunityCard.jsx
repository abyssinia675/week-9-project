import React from "react";

export default function OpportunityCard({ opportunity, onDelete, isLocal }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      onDelete(opportunity.id);
    }
  };

  const organizationName =
    opportunity.organization?.name || opportunity.organization || "N/A";

  const categoryLabel =
    opportunity.category ||
    opportunity.activities
      ?.map((activity) => activity.category)
      .filter(Boolean)
      .join(", ") ||
    "General";

  const dateLabel = opportunity.date || opportunity.dates || "No date listed";
  const remoteValue =
    opportunity.remote === true ||
    opportunity.remote === "true" ||
    opportunity.remote_or_online === true ||
    opportunity.remote_or_online === "true";

  return (
    <div className="opportunity-card">
      <div className="card-header">
        <h3 className="card-title">
          {opportunity.title || "Untitled Opportunity"}
        </h3>
        {isLocal && <span className="local-badge">Your Opportunity</span>}
      </div>

      <div className="card-body">
        <p className="card-field">
          <strong>Organization:</strong> {organizationName}
        </p>

        <p className="card-field">
          <strong>Category:</strong> {categoryLabel}
        </p>

        <p className="card-description">
          <strong>Description:</strong>{" "}
          {opportunity.description || "No description provided"}
        </p>

        <div className="card-info-grid">
          {opportunity.location && (
            <p className="card-field">
              <strong>📍 Location:</strong> {opportunity.location}
            </p>
          )}

          {dateLabel && (
            <p className="card-field">
              <strong>📅 Date:</strong>{" "}
              {dateLabel === "No date listed"
                ? dateLabel
                : new Date(dateLabel).toLocaleDateString()}
            </p>
          )}

          {remoteValue !== undefined && (
            <p className="card-field">
              <strong>🌐 Remote:</strong> {remoteValue ? "Yes" : "No"}
            </p>
          )}
        </div>
      </div>

      {isLocal && (
        <div className="card-footer">
          <button
            className="delete-btn"
            onClick={handleDelete}
            aria-label={`Delete ${opportunity.title}`}
          >
            ❌ Delete
          </button>
        </div>
      )}
    </div>
  );
}
