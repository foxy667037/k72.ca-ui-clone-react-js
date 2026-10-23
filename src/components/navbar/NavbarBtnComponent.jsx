const NavbarBtnComponent = ({ navbarMenuOpen }) => {
  return (
    <button onClick={() => navbarMenuOpen()} className="relative group flex flex-col bg-black w-full h-full text-white cursor-pointer overflow-hidden">
      {/* Hover background */}
      <div className="absolute top-0 left-0 w-full h-0 bg-(--primary-color) z-0 transition-all duration-200 group-hover:h-full" />

      {/* Hamburger */}
      <div className="relative z-10 h-22 shrink-0 w-full pr-8 pt-5.5 flex flex-col items-end justify-start gap-1">
        <span className="w-12 h-px bg-white transition-colors duration-500 group-hover:bg-black" />
        <span className="w-6 h-px bg-white transition-colors duration-500 group-hover:bg-black" />
      </div>

      {/* Menu */}
      <div className="relative z-10 h-22 w-full flex items-end text-xl font-[Lausanne-500] text-white pl-2.5 transition-colors duration-500 group-hover:text-black">
        <span className="uppercase pb-0.5">MENU</span>
      </div>
    </button>
  );
};

export default NavbarBtnComponent;
