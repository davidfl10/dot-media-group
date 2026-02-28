'use client';
import { useState, useEffect } from 'react';

export default function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(
    () => (typeof window !== 'undefined' ? window.innerWidth : 0)
  );

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return width;
}