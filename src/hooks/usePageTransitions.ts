import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransitions = () => {
  const location = useLocation();

  useEffect(() => {
    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add page transition class for CSS transitions if needed
    document.body.classList.add('page-transitioning');
    
    const timer = setTimeout(() => {
      document.body.classList.remove('page-transitioning');
    }, 500);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('page-transitioning');
    };
  }, [location.pathname]);
};