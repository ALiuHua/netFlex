import styled from "styled-components";

const CheckedIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.68239 19.7312L23.6824 5.73115L22.3178 4.26904L8.02404 17.6098L2.70718 12.293L1.29297 13.7072L7.29297 19.7072C7.67401 20.0882 8.28845 20.0988 8.68239 19.7312Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

const AddToListIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
const ToggleListButton = styled.button`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: 1px solid #fff;
  margin-right: auto;
  margin-left: 1rem;
  svg {
    width: 2rem;
    height: 2rem;
    padding: 4px;
  }
`;

export const ListButton = ({ isChecked, onClick }) => {
  return (
    <ToggleListButton onClick={onClick}>
      {isChecked ? <CheckedIcon /> : <AddToListIcon />}
    </ToggleListButton>
  );
};
