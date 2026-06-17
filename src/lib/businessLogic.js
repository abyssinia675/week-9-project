// Business logic helper functions

export const countRemoteOpportunities = (opportunities) => {
  if (!Array.isArray(opportunities)) return 0;
  return opportunities.filter(
    (opp) => opp.remote === true || opp.remote === "true",
  ).length;
};

export const getTotalOpportunities = (apiOpportunities, localOpportunities) => {
  return (apiOpportunities?.length || 0) + (localOpportunities?.length || 0);
};

export const groupOpportunitiesByCategory = (opportunities) => {
  if (!Array.isArray(opportunities)) return {};

  return opportunities.reduce((acc, opp) => {
    const category = opp.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(opp);
    return acc;
  }, {});
};

export const filterOpportunitiesBySearch = (opportunities, searchTerm) => {
  if (!searchTerm.trim()) return opportunities;

  const term = searchTerm.toLowerCase();
  return opportunities.filter(
    (opp) =>
      (opp.title && opp.title.toLowerCase().includes(term)) ||
      (opp.organization && opp.organization.toLowerCase().includes(term)) ||
      (opp.description && opp.description.toLowerCase().includes(term)) ||
      (opp.category && opp.category.toLowerCase().includes(term)),
  );
};

export const sortOpportunitiesByDate = (opportunities) => {
  return [...opportunities].sort((a, b) => {
    const dateA = new Date(a.date) || new Date(0);
    const dateB = new Date(b.date) || new Date(0);
    return dateA - dateB;
  });
};

// Normalize opportunities: ensure `date`, `category`, and `remote` fields exist.
export const normalizeOpportunities = (opportunities = []) => {
  const SAMPLE_CATEGORIES = [
    "Education",
    "Healthcare",
    "Environment",
    "Community",
    "Animals",
    "Arts & Culture",
    "Sports & Recreation",
    "Fundraising",
    "Administration",
    "Other",
  ];

  const randomDateWithinDays = (days = 120) => {
    const now = Date.now();
    const add = Math.floor(Math.random() * days) + 1; // 1..days
    return new Date(now + add * 24 * 60 * 60 * 1000).toISOString();
  };

  return opportunities.map((opp) => {
    const normalized = { ...opp };

    // Normalize remote flag
    if (normalized.remote === undefined) {
      if (normalized.remote_or_online !== undefined) {
        normalized.remote =
          normalized.remote_or_online === true ||
          normalized.remote_or_online === "true";
      } else {
        normalized.remote = false;
      }
    }

    // Normalize category: prefer category, then activities, then sample
    if (!normalized.category || typeof normalized.category !== "string") {
      if (
        Array.isArray(normalized.activities) &&
        normalized.activities.length > 0
      ) {
        const cats = normalized.activities
          .map((a) => a?.category)
          .filter(Boolean);
        normalized.category =
          cats.length > 0
            ? cats[0]
            : SAMPLE_CATEGORIES[
                Math.floor(Math.random() * SAMPLE_CATEGORIES.length)
              ];
      } else {
        normalized.category =
          SAMPLE_CATEGORIES[
            Math.floor(Math.random() * SAMPLE_CATEGORIES.length)
          ];
      }
    }

    // Normalize date: prefer `date`, then `dates`, else assign random future date
    const ensureFutureDate = (value) => {
      const date = new Date(value);
      if (!value || Number.isNaN(date.getTime()) || date <= new Date()) {
        return new Date(
          Date.now() +
            (Math.floor(Math.random() * 120) + 1) * 24 * 60 * 60 * 1000,
        );
      }
      return date;
    };

    const formatDateLabel = (date) =>
      new Date(date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

    let parsedDate = null;
    if (normalized.date) {
      parsedDate = new Date(normalized.date);
    }
    if (
      (!parsedDate || Number.isNaN(parsedDate.getTime())) &&
      normalized.dates
    ) {
      const m = normalized.dates.match(/\b(\w+ \d{1,2}, \d{4})\b/);
      parsedDate = m ? new Date(m[1]) : null;
    }

    const futureDate = ensureFutureDate(parsedDate);
    normalized.date = futureDate.toISOString();
    normalized.dates = formatDateLabel(futureDate);

    return normalized;
  });
};
