import React, { useState } from "react";

const CATEGORIES = [
  "Education",
  "Healthcare",
  "Environment",
  "Animal Welfare",
  "Community Service",
  "Disaster Relief",
  "Social Services",
  "Arts & Culture",
  "Sports & Recreation",
  "Other",
];

export default function AddOpportunityForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    description: "",
    location: "",
    date: "",
    category: "Other",
    remote: false,
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title.trim() ||
      !formData.organization.trim() ||
      !formData.description.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Call parent function to add opportunity
    onAdd(formData);

    // Reset form
    setFormData({
      title: "",
      organization: "",
      description: "",
      location: "",
      date: "",
      category: "Other",
      remote: false,
    });

    // Show success message
    setSuccessMessage("Opportunity created successfully! ✅");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <section className="add-form-section">
      <div className="section-container">
        <h2>Create Your Own Opportunity</h2>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label htmlFor="title">Opportunity Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Community Cleanup Event"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="organization">Organization Name *</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="e.g., Green Earth Foundation"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the volunteer opportunity..."
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Downtown Park"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="remote">
                <input
                  type="checkbox"
                  id="remote"
                  name="remote"
                  checked={formData.remote}
                  onChange={handleChange}
                />
                Remote/Online
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create Opportunity
          </button>
        </form>
      </div>
    </section>
  );
}
