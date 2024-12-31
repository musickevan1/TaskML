export const navigationStyles = {
  mobileHeader: `
    flex items-center justify-between h-16 px-4 
    border-b border-gray-200 bg-white
    sticky top-0 z-10
  `,
  mobileCloseButton: `
    -mr-2 p-2 rounded-md 
    text-gray-400 hover:text-gray-500 
    hover:bg-gray-100 
    focus:outline-none focus:ring-2 
    focus:ring-inset focus:ring-blue-500
    transition-colors
  `,
  mobileMenuButton: `
    md:hidden fixed top-0 left-0 z-50 
    p-4 text-gray-500 
    hover:text-gray-600 hover:bg-gray-100 
    focus:outline-none focus:ring-2 
    focus:ring-inset focus:ring-blue-500
    transition-colors
  `,
  navigationMenu: `
    fixed top-0 left-0 h-full bg-white z-40
    transition-all duration-300 ease-in-out
    flex flex-col shadow-xl
  `,
  backdrop: `
    fixed inset-0 
    bg-gray-600 bg-opacity-50 
    transition-opacity z-40
  `
} as const;