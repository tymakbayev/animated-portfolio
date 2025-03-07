import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for observing elements entering or leaving the viewport
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} - Observer methods and state
 */
const useIntersectionObserver = (options = {}) => {
  const [observedElements, setObservedElements] = useState({});
  const [entries, setEntries] = useState([]);
  const observer = useRef(null);

  // Initialize the IntersectionObserver
  useEffect(() => {
    const { root = null, rootMargin = '0px', threshold = 0 } = options;
    
    observer.current = new IntersectionObserver(
      (observedEntries) => {
        setEntries(observedEntries);
      },
      { root, rootMargin, threshold }
    );

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [options.root, options.rootMargin, options.threshold]);

  // Update observed elements when they change
  useEffect(() => {
    const currentObserver = observer.current;
    
    if (!currentObserver) return;
    
    const elements = Object.values(observedElements);
    
    elements.forEach(element => {
      if (element) {
        currentObserver.observe(element);
      }
    });

    return () => {
      elements.forEach(element => {
        if (element) {
          currentObserver.unobserve(element);
        }
      });
    };
  }, [observedElements]);

  // Add element to observed elements
  const observe = useCallback((element, id) => {
    if (!element) return;
    
    setObservedElements(prev => ({
      ...prev,
      [id]: element
    }));
  }, []);

  // Remove element from observed elements
  const unobserve = useCallback((id) => {
    setObservedElements(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  }, []);

  // Get the intersection state of a specific element
  const getIntersectionDetails = useCallback((id) => {
    const entry = entries.find(entry => 
      observedElements[id] && entry.target === observedElements[id]
    );
    
    return {
      isIntersecting: entry?.isIntersecting || false,
      intersectionRatio: entry?.intersectionRatio || 0,
      entry: entry || null
    };
  }, [entries, observedElements]);

  // Create a ref that automatically observes its element
  const useObservedRef = (id) => {
    const ref = useCallback(node => {
      if (node) {
        observe(node, id);
      }
    }, [id]);

    return ref;
  };

  return { 
    observe, 
    unobserve, 
    entries,
    getIntersectionDetails,
    useObservedRef
  };
};

export default useIntersectionObserver;