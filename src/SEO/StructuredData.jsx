import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Atharva Jagtap",
    "url": "https://jagtapworks.com",
    "image": "https://jagtapworks.com/assets/logos/og-image.png",
    "email": "atharva@jagtapworks.com",
    "jobTitle": "Software Engineer",
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "University of British Columbia",
        "url": "https://www.ubc.ca"
      }
    ],
    "knowsAbout": [
      "Software Engineering",
      "Full-Stack Web Development",
      "Data Analytics",
      "Machine Learning",
      "Cloud Computing",
      "Business Strategy",
      "Finance",
      "Database Management",
      "Data Visualization",
      "UI/UX Design"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/atharvahjagtap/",
      "https://github.com/atharvaj0gtap"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "JagtapWorks",
    "url": "https://jagtapworks.com",
    "description": "Portfolio of Atharva Jagtap, a 2025 UBC Computer Science graduate who builds systems that take manual work off people's hands: outreach automation, HR documents, carbon accounting and test automation."
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
