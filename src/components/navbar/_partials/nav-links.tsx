"use client";
import Link from "next/link";
import { navLinks } from "./nav-links.data";
import cntl from "cntl";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

const styles = {
  navMainLink: cntl`flex items-center justify-center p-2 text-[#1E1E1E] rounded-lg md:text-xs lg:text-base bg-[linear-gradient(to_top,var(--tw-gradient-stops))] h-fit`,
  navHoverLink: `hover:text-blue-700 hover:bg-blue-600/10`,
  base: `gap-2 text-center w-full font-medium rounded-md md:text-base flex items-center justify-center`,
  dropdownLink: `flex items-center justify-start w-full gap-2 px-5  py-2 hover:text-blue-700 font-medium rounded-md hover:bg-blue-600/10 z-50`,
};

export function NavLinks({
  closeMobileNavbar,
  isMobile,
}: {
  closeMobileNavbar: () => void;
  isMobile: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const handleChangePath = (path: string) => {
    if (isMobile) {
      closeMobileNavbar();
    }
    router.push(path);
  };
  const links = navLinks.map((navLink, index) => (
    <Link
      className={`${styles.navMainLink} ${
        navLink.link === pathname
          ? "text-white"
          : "text-slate-400 hover:text-white"
      } `}
      data-cy={navLink.dataCy}
      key={index}
      href={navLink.link}
      onClick={closeMobileNavbar}
    >
      {navLink.text}
    </Link>
  ));
  return <>{links}</>;
}
