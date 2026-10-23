import { NavLink } from "react-router";

const BottomLinks = () => {
  const links = [
    { name: "projets", to: "/projets" },
    { name: "agence", to: "/agence" },
  ];

  return (
    <ul className="flex gap-5 w-full justify-center items-center mt-5.5 h-auto">
      {links.map((link) => (
        <li key={link.name} className="group pt-4.25 cursor-pointer h-auto">
          <NavLink
            to={link.to}
            key={link.name}
            className="border-3 border-white rounded-full flex items-end no-underline tracking-wide text-[80px] px-6.5 pt-4.25 leading-14 uppercase font-[Lausanne-500] group-hover:text-(--primary-color) group-hover:border-(--primary-color)"
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default BottomLinks;
