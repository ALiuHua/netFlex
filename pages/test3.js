import React from "react";
import { MuteButton } from "../components/ui/But";
import { CloseButton } from "../components/ui/Buttons";
const Test3 = () => {
  console.log(MuteButton);
  console.log(CloseButton);
  return (
    <div>
      <div>Test3</div>
      <MuteButton muted={true} onClick={() => console.log("yes")} />
      {/* <CloseButton onClick={() => console.log("yes")} /> */}
    </div>
  );
};

export default Test3;
