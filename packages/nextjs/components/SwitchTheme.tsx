import { useEffect, useState } from "react";
import { useDarkMode, useIsMounted } from "usehooks-ts";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { isDarkMode, toggle } = useDarkMode();
  const [initialized, setInitialized] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    const userPrefersDark = localStorage.getItem("theme") === "dark";
    if (!initialized && !userPrefersDark) {
      toggle();
      setInitialized(true);
    }
    const body = document.body;
    body.setAttribute("data-theme", isDarkMode ? "MantaCareDark" : "MantaCare");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, toggle, initialized]);

  return (
    <div className={`flex space-x-2 text-sm ${className}`}>
      <input
        id="theme-toggle"
        type="checkbox"
        className="toggle toggle-primary bg-primary"
        onChange={toggle}
        checked={isDarkMode}
      />
      {isMounted() && (
        <label htmlFor="theme-toggle" className={`swap swap-rotate ${!isDarkMode ? "swap-active" : ""}`}>
          <SunIcon className="swap-on h-5 w-5" />
          <MoonIcon className="swap-off h-5 w-5" />
        </label>
      )}
    </div>
  );
};
