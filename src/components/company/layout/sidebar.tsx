export default function CompanySidebar() {
  return (
    <div className="bg-white border-r border-gray-200 h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            {/* <img src="/assets/logo.svg" alt="Logo" className="h-8 w-8" /> */}
            <span className="ml-2 text-lg font-semibold">Company</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 mt-5">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-lg"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 mt-2 text-sm font-medium text-gray-500 rounded-lg"
            >
              Employees
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 mt-2 text-sm font-medium text-gray-500 rounded-lg"
            >
              Departments
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 mt-2 text-sm font-medium text-gray-500 rounded-lg"
            >
              Settings
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
