import s from "./header.module.scss"

import cn from "clsx"
import { Link } from "react-router-dom"

import { breakpoints } from "@/lib/utils"
import { useMediaQuery } from "@uidotdev/usehooks"
import { IconLogo } from "@/components/icons"

const Header = () => {
  const isMobile = useMediaQuery(`only screen and (max-width:${breakpoints.mobile}px)`)

  console.log(isMobile)

  return (
    <header className="flex items-center justify-between">
      <Link to="/" className={cn(s.logoC, "cursor-pointer")}>
        <IconLogo />
      </Link>

      <nav className={s.navDesktop}>
        <div className={cn(s.navItem, "cursor-pointer")}>
          <Link to="/works">Works</Link>
        </div>

        <div className={cn(s.navItem, "cursor-pointer")}>
          <Link to="/lets-talk">Let's Talk</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
