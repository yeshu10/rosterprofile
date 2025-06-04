interface ProfileMenuProps {
  activeMenu: string;
  onMenuItemClick: (menu: string) => void;
}

export default function ProfileMenu({ activeMenu, onMenuItemClick }: ProfileMenuProps) {
  const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Worked With' },
    { id: 'projects', label: 'Projects' },
     { id: 'content', label: 'Content Verticals' },
    { id: 'jobtype', label: 'Job Types & Pricing' }
  ];

  const handleClick = (menuId: string) => {
    onMenuItemClick(menuId);
    // scrollToSection(menuId); // Re-enable when sections have IDs
  };

  return (
    <div className="border border-gray-300  rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-bold text-gray-900  mb-4">QUICK MENU</h3>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className="mb-2">
            <button
              onClick={() => handleClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200
                ${
                  activeMenu === item.id
                    ? 'bg-blue-100 text-blue-800 dark:text-white font-semibold'
                    : ' dark:text-gray-300 hover:bg-gray-100 '
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
