import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
import { useTheme } from "../context/theme-context";

const DarkModeToggle = () => {
  const { mode, setMode } = useTheme();

  const isDarkMode = mode === "dark";

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isDarkMode}
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            // onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block dark:bg-white h-8 w-14 rounded-full ${isDarkMode ? "bg-gray-800" : "bg-blue-500"}`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center dark:bg-gray-800 justify-center rounded-full bg-white transition ${
              isDarkMode ? "translate-x-full" : ""
            }`}
          >
            {isDarkMode ? (
              <BiMoon className="text-gray-800 dark:text-white" size={14} />
            ) : (
              <BiSun className="text-blue-500" size={14} />
            )}
          </div>
        </div>
      </label>
    </>
  );
};

export default DarkModeToggle;
