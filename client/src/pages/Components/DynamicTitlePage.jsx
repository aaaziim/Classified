import { useEffect } from "react";

const DynamicTitlePage = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return 
};

export default DynamicTitlePage;
