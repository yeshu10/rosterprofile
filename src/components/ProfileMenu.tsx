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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (menuId: string) => {
    onMenuItemClick(menuId);
    // scrollToSection(menuId); // Re-enable when sections have IDs
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">QUICK MENU</h3>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className="mb-2">
            <button
              onClick={() => handleClick(item.id)}
              className={`text-gray-600 hover:text-gray-900 ${
                activeMenu === item.id ? 'font-semibold' : ''
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