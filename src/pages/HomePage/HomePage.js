import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './HomePage.css';

export default function HomePage() {
  useEffect(() => {
    const previews = document.querySelectorAll('[data-preview]');
    // Add event listeners to each preview element
    previews.forEach(preview => {
      const onMouseOver = () => {
        gsap.to(preview, {
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      const onMouseOut = () => {
        gsap.to(preview, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      preview.addEventListener('mouseover', onMouseOver);
      preview.addEventListener('mouseout', onMouseOut);

      // Cleanup
      return () => {
        preview.removeEventListener('mouseover', onMouseOver);
        preview.removeEventListener('mouseout', onMouseOut);
      };
    });
  }, []);

  return (
    <div className="preview-container">
      <div className="preview-group">
        <div className="todo-preview" data-preview></div>
        <div className="description">description 1</div>
      </div>
      <div className="preview-group">
        <div className="todo-preview" data-preview></div>
        <div className="description">description 2</div>
      </div>
      <div className="preview-group">
        <div className="todo-preview" data-preview></div>
        <div className="description">description 3</div>
      </div>
    </div>
  );
}