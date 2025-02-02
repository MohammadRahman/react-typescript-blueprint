import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonWithIcon from "../button-with-icon/ButtonWithIcon";
import { useDarkMode } from "@context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonWithIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonWithIcon>
  );
}

export default DarkModeToggle;
