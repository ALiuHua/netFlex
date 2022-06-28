import React, { useState } from "react";
import { useRouter } from "next/router";
const Container = ({ children }) => {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
      {children}
      <button
        onClick={() => {
          //   router.push(`/test/?jbv=1`);
          window.history.replaceState(
            {
              ...window.history.state,
              as: `/test/?jba=1`,
              url: `/test/?jba=1`,
            },
            "",
            `/test/?jba=1`
          );
          setShowMore(true);
        }}
      >
        click me
      </button>
      {showMore && <p>clicked</p>}
    </div>
  );
};

export default Container;
