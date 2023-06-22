export const IconNavHome = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.00018 14.0005V11.5005M7.39185 1.35053L1.61685 5.97553C0.966847 6.49219 0.55018 7.58386 0.691847 8.40053L1.80018 15.0339C2.00018 16.2172 3.13351 17.1755 4.33351 17.1755H13.6668C14.8585 17.1755 16.0002 16.2089 16.2002 15.0339L17.3085 8.40053C17.4418 7.58386 17.0252 6.49219 16.3835 5.97553L10.6085 1.35886C9.71685 0.642192 8.27518 0.642192 7.39185 1.35053Z"
      stroke="var(--stroke)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconNavQuiz = () => (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.16667 14.2503H16.5M8.16667 8.41699H16.5M8.16667 2.58366H16.5M1.5 2.58366L2.33333 3.41699L4.83333 0.916992M1.5 8.41699L2.33333 9.25033L4.83333 6.75033M1.5 14.2503L2.33333 15.0837L4.83333 12.5837"
      stroke="var(--stroke)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconNavArticles = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.75 8H7.25M14.75 14H7.25M8 21H14C19 21 21 19 21 14V8C21 3 19 1 14 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21Z"
      stroke="var(--stroke)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconPlus = ({
  stroke = "var(--color-white)",
}: {
  stroke?: string;
}) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 6H10.5M6 10.5V1.5"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
