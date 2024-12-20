import { useState } from "react";

export default function Container({
  arrowDirection,
  arrowModifier,
  dropBtnModifier,
  onArrowClick,
  children,
}) {
  const [show, setShow] = useState(true);
  const handleShowToggle = () => setShow((curr) => !curr);
  return (
    <div className="main__container flex flex-column primary-color border-radius-6">
      <button
        className={`main__dorp-btn primary-color fz-18 pointer ${dropBtnModifier}`}
        onClick={handleShowToggle}
      >
        {show ? "-" : "+"}
      </button>
      <button
        className={`main__arrow-btn pointer ${arrowModifier}`}
        onClick={onArrowClick}
      >
        {arrowDirection}
      </button>
      {show ? children : null}
    </div>
  );
}
