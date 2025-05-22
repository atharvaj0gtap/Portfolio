import React, { useEffect, useRef } from 'react';
import './CertificationsModal.css';

const CertificationsModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, [isOpen, onClose]);
  
  // Close when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Certification data - replace with your actual certifications
  const certifications = [
    {
      id: 1,
      name: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",  
      date: "August 2024",
      credentialLink: "https://learn.microsoft.com/api/credentials/share/en-us/Atharva-3176/72CB26F98B412A2C?sharingId",
      logo: "/assets/certifications/microsoft.png"
    },
    {
      id: 2,
      name: "Data Analytics Essentials",
      issuer: "Cisco",
      date: "May 2024",
      credentialLink: "https://www.credly.com/badges/bacd06fb-bc32-4119-b94f-1ca724a0859b/linked_in_profile",
      logo: "/assets/certifications/cisco.png"
    },
    {
      id: 3,
      name: "Introduction to Cybersecurity",
      issuer: "Cisco",
      date: "May 2024",
      credentialLink: "https://www.credly.com/badges/2ba9ee36-5df8-4c0c-a9ef-e058192a32fb/linked_in_profile",
      logo: "/assets/certifications/cisco.png"
    },
    {
      id: 4,
      name: "Introduction to Data Science",
      issuer: "Cisco",
      date: "May 2024",
      credentialLink: "https://www.credly.com/badges/2ba9ee36-5df8-4c0c-a9ef-e058192a32fb/linked_in_profile",
      logo: "/assets/certifications/cisco.png"
    },
    {
      id: 5,
      name: "Database Web Development",
      issuer: "Canvas Credentials - University of British Columbia",
      date: "December 2023",
      credentialLink: "https://ca.badgr.com/public/assertions/JlZRUidGR5aKg-rrIr0x-Q",
      logo: "/assets/certifications/canvas.png"
    }
  ];

  return (
    <div 
      className="certifications-modal-overlay"
      aria-modal="true"
      role="dialog"
      aria-labelledby="cert-modal-title"
    >
      <div 
        className="certifications-modal"
        ref={modalRef}
        tabIndex="-1"
      >
        <div className="certifications-modal-content">
          <div className="cert-header">
            <h2 id="cert-modal-title">Professional Certifications</h2>
            <button 
              className="close-button" 
              onClick={onClose}
              aria-label="Close certifications modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="certifications-list">
            {certifications.map(cert => (
              <div className="certification-item" key={cert.id}>
                <div className="cert-logo">
                  {cert.logo && <img src={cert.logo} alt={`${cert.issuer} logo`} />}
                </div>
                <div className="cert-details">
                  <h3>{cert.name}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-dates">
                    Issued: {cert.date}
                  </p>
                  <a 
                    href={cert.credentialLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="verify-link"
                  >
                    Verify Credential
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsModal;