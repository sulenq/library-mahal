import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useBackOnClose = (
  id: string,
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
) => {
  const location = useLocation();

  // handle onOpen, push history if needed
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const modalId = currentUrl.searchParams.get(id);

    if (isOpen && !modalId) {
      currentUrl.searchParams.set(id, "1");
      window.history.pushState(null, "", currentUrl.toString());
    }
  }, [isOpen, id]);

  const handlePopState = useCallback(() => {
    const currentUrl = new URL(window.location.href);
    const modalId = currentUrl.searchParams.get(id);
    console.log(id, modalId, location);

    if (modalId) {
      console.log("masuk sini");
      onOpen();
    } else {
      onClose();
    }
  }, [location, id, onOpen, onClose]);

  // handle trigger popstate (back)
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      if (isOpen) {
        window.removeEventListener("popstate", handlePopState);
      }
    };
  }, [isOpen, handlePopState]);

  // handle initial onOpen with query parameter
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const modalId = currentUrl.searchParams.get(id);

    if (modalId) {
      onOpen();
    } else {
      onClose();
    }
  }, [location, id, onOpen, onClose]);
};

export default useBackOnClose;
