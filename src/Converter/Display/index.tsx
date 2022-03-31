import { useContext } from "react";
import { Context } from "../../state/Context";

import "./styles.scss";

interface DisplayProps {
  display: number;
}

export const Display: React.FC<DisplayProps> = ({ display }) => {
  const { amount, conversionCurr } = useContext(Context);

  return (
    <div className="display">
      <h2 className="display__from">
        {`${Number(amount)} ${conversionCurr.convertFrom} =`}
      </h2>
      <h1 className="display__to">{`${parseFloat(Number(display).toFixed(5))} ${
        conversionCurr.convertTo
      }`}</h1>
    </div>
  );
};
