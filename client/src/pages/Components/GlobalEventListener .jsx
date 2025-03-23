import { useEffect } from "react";
import { toast } from "react-hot-toast";

const GlobalEventListener = ({ children }) => {
  useEffect(() => {
    const handleCopy = (event) => {
      event.preventDefault();
      toast.error("Copying is disabled!");
    };

    const handlePaste = (event) => {
      event.preventDefault();
      toast.error("Pasting is disabled!");
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
      toast.error("Right-click is disabled!");
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return <>{children}</>;
};

export default GlobalEventListener;
