import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './HomePage.css';
import PreviewAdd from '../../Assets/Add.png';
import PreviewEdit from '../../Assets/Edit.png';
import PreviewRemove from '../../Assets/Remove.png';

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
        <div className="todo-preview" data-preview>
          <img src={PreviewAdd} alt="Preview for Adding functionality"></img>
        </div>
        <div className="description">Add</div>
      </div>
      <div className="preview-group">
        <div className="todo-preview" data-preview>
          <img src={PreviewEdit} alt="Preview for Edit functionality"></img>
        </div>
        <div className="description">Edit</div>
      </div>
      <div className="preview-group">
        <div className="todo-preview" data-preview>
          <img src={PreviewRemove} alt="Preview for Remove functionality"></img>
        </div>
        <div className="description">Remove</div>
      </div>
    </div>
  );
}