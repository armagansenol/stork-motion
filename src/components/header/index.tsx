import s from "./header.module.scss"

import cx from "clsx"
import { Link } from "react-router-dom"

import { IconLogo } from "@/components/icons"

interface Props {
  className?: string
}

const Header = (props: Props) => {
  return (
    <header className={cx(props.className, "flex items-center justify-between")}>
      <Link to="/" className={cx(s.logoC, "cursor-pointer")}>
        <IconLogo />
      </Link>

      <nav className={s.navDesktop}>
        <div className={cx(s.navItem, "cursor-pointer")}>
          <Link to="/works">Works</Link>
        </div>

        <div className={cx(s.navItem, "cursor-pointer")}>
          <Link to="/lets-talk">Let's Talk</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
