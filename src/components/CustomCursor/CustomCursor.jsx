import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorState, setCursorState] = useState({
    visible: false,
    hovering: false,
    label: null,
  });

  useEffect(() => {
    // Skip cursor on touch devices or fine pointer absent
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    // Smooth follower using GSAP quickTo for 120fps performance
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    let isVisible = false;

    const onMouseMove = (e) => {
      if (!isVisible) {
        isVisible = true;
        setCursorState((prev) => ({ ...prev, visible: true }));
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onMouseLeave = () => {
      isVisible = false;
      setCursorState((prev) => ({ ...prev, visible: false }));
    };

    const onMouseEnter = () => {
      isVisible = true;
      setCursorState((prev) => ({ ...prev, visible: true }));
    };

    const onMouseOver = (e) => {
      const cursorTarget = e.target.closest('[data-cursor]');
      const clickableTarget = e.target.closest('a, button, [data-hover], input, textarea, select');

      if (cursorTarget) {
        const label = cursorTarget.getAttribute('data-cursor');
        setCursorState((prev) => ({ ...prev, hovering: true, label: label || 'VIEW' }));
      } else if (clickableTarget) {
        setCursorState((prev) => ({ ...prev, hovering: true, label: null }));
      } else {
        setCursorState((prev) => ({ ...prev, hovering: false, label: null }));
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const { visible, hovering, label } = cursorState;

  return (
    <>
      <div
        ref={dotRef}
        className={`${styles.cursorDot} ${visible ? styles.visible : ''}`}
      />
      <div
        ref={ringRef}
        className={`
          ${styles.cursorFollower}
          ${styles.ring}
          ${visible ? styles.visible : ''}
          ${hovering ? styles.hovering : ''}
          ${label ? styles.badgeMode : ''}
        `}
      >
        {label && <span className={styles.cursorLabel}>{label}</span>}
      </div>
    </>
  );
}
