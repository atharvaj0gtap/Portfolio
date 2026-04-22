import React, { useState, useEffect } from "react";
import "./ProjectFolder.css";

const darkenColor = (hex, percent) => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split("").map((c) => c + c).join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const ProjectFolder = ({ 
  color = "#5C96FF", 
  size = 2, 
  onOpenComplete,
  projectThumbnails = [],
  folderLogo = null 
}) => {
  const [open, setOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(
    Array.from({ length: 3 }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor("#ffffff", 0.1);
  const paper2 = darkenColor("#ffffff", 0.05);
  const paper3 = "#ffffff";

  const handleClick = () => {
    if (!open) {
      setOpen(true);
      
      // After folder opens, start exit animation
      setTimeout(() => {
        setExiting(true);
        
        // After exit animation, call onOpenComplete
        setTimeout(() => {
          if (onOpenComplete) onOpenComplete();
        }, 800); // Exit animation duration
      }, 1000); // Time before starting exit
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e, index) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
  };

  let folderClassName = `project-folder ${open ? "open" : ""}`;
  if (exiting) folderClassName += " exiting";
  
  const scaleStyle = { transform: `scale(${size})` };

  return (
    <div className="folder-container" style={scaleStyle}>
      <div className={folderClassName} style={folderStyle} onClick={handleClick}>
        {/* Logo positioned above the folder for better visibility */}
        {folderLogo && (
          <div className="folder-logo-container">
            <img src={folderLogo} alt="Folder logo" className="folder-logo" width="48" height="48" loading="lazy" />
          </div>
        )}
        
        <div className="folder__back">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`paper paper-${i + 1}`}
              onMouseMove={(e) => handlePaperMouseMove(e, i)}
              onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
              style={
                open
                  ? {
                    "--magnet-x": `${paperOffsets[i]?.x || 0}px`,
                    "--magnet-y": `${paperOffsets[i]?.y || 0}px`,
                  }
                  : {}
              }
            >
              <div className="paper-content">
                {projectThumbnails[i] && (
                  <img
                    src={projectThumbnails[i]}
                    alt={`Project ${i + 1}`}
                    className="paper-thumbnail"
                    width="200"
                    height="150"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          ))}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFolder;