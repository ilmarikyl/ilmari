const H1 = ({ children }) => (
  <h1 className="mb-8 text-3xl font-semibold md:text-4xl">{children}</h1>
)

const H2 = ({ children }) => (
  <h2 className="mb-2 mt-8 text-xl font-semibold md:text-2xl">{children}</h2>
)

const H3 = ({ children }) => (
  <h3 className="text-md mb-1 mt-3 ml-2 font-medium md:text-lg">{children}</h3>
)

const P = ({ children }) => (
  <p className="mb-4 text-[14px] text-gray-700 dark:text-blue-200 md:text-base">
    {children}
  </p>
)

const LI = ({ children }) => (
  <li className="ml-6 text-sm text-gray-700 dark:text-blue-200 md:text-base">
    {children}
  </li>
)

const A = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-light-primary-hl hover:cursor-pointer hover:text-red-600 dark:text-yellow-200 dark:hover:text-yellow-300"
  >
    {children}
    {'\u00A0'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block h-[1.2rem] w-[1.2rem]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  </a>
)

export { H1, H2, H3, P, LI, A }
