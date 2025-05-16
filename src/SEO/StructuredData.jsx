import React from 'react';
import { Helmet } from 'react-helmet';

const StructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Atharva Jagtap",
    "url": "https://jagtapworks.com",
    "image": "https://jagtapworks.com/og-image.png",
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "University of British Columbia",
        "url": "https://www.ubc.ca"
      }
    ],
    "knowsAbout": [
      "Software Engineering",
      "Data Analytics", 
      "Web Development",
      "Machine Learning",
      "Data Visualization",
      "Cloud Computing",
      "Project Management",
      "UI/UX Design",
      "Database Management",
      "Mobile App Development",
      "Data Engineering"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/atharvahjagtap/",
      "https://github.com/atharvaj0gtap"
      // Add other relevant profiles
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "JagtapWorks Portfolio",
    "url": "https://jagtapworks.com",
    "description": "Professional portfolio showcasing projects and expertise",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://jagtapworks.com/#search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;