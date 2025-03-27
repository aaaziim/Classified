import { useEffect } from "react";
import { useRouter } from "react-router-dom";

const ScrollToTop = () => {
  const router = useRouter(); // Get router instance

  useEffect(() => {
    const unsubscribe = router.subscribe(() => {
      window.scrollTo(0, 0);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [router]);

  return null; // No UI needed
};

export default ScrollToTop;
