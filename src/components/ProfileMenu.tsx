interface ProfileMenuProps {
  activeMenu: string;
  onMenuItemClick: (menu: string) => void;
}

export default function ProfileMenu({ activeMenu, onMenuItemClick }: ProfileMenuProps) {
  const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Worked With' },
    { id: 'projects', label: 'Projects' },
    { id: 'content', label: 'Content' }
  ];

  const handleClick = (menuId: string) => {
    onMenuItemClick(menuId);
    // scrollToSection(menuId); // Re-enable when sections have IDs
  };

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">QUICK MENU</h3>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className="mb-2">
            <button
              onClick={() => handleClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200
                ${
                  activeMenu === item.id
                    ? 'bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
