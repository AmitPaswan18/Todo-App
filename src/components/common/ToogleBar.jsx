import { useState, useEffect } from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

const ToogleBar = () => {
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? "#1a1b1e" : "white";
  }, [isDark]);

  function handletoggleCick() {
    setDark(!isDark);
  }

  return (
    <div className="relative border-2 max-h-8 p-1 rounded-md bg-white lg:left-1/10 md:right-10 right-4 top-2 ">
      <button  onClick={handletoggleCick}>
        {" "}
        {isDark ? <RiMoonClearFill color="skyblue" /> : <RiSunFill  color="orange"/>}
      </button>
    </div>
  );
};

export default ToogleBar;
