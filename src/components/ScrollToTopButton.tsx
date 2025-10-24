import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300); // show only after scrolling down a bit
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`fixed bottom-4 right-24 md:right-24 w-14 h-14 flex items-center justify-center 
                  rounded-full shadow-lg text-2xl font-bold transition-opacity duration-300 ease-in-out
                  ${
                    isVisible
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }
                  bg-emerald-600 text-white hover:bg-emerald-700 
                  dark:bg-emerald-500 dark:hover:bg-emerald-400 
                  z-[9999999]`}
    >
      ↑
    </button>
  );
}
