// import { useRef, useEffect } from "react";

// const useClickOutside = (clickHandler) => {
//   const searchRef = useRef();
//   useEffect(() => {
//     const clickHandler = (e) => {
//       if (pathname !== "/browse") return;
//       if (!searchRef.current?.contains(e.target)) setShowSearchBar(false);
//     };
//     document.addEventListener("click", clickHandler);
//     return () => {
//       removeEventListener("click", clickHandler);
//     };
//   }, []);
// };

// export default useClickOutside;
