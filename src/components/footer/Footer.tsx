import s from "./footer.module.scss"

import cx from "clsx"

export default function Footer() {
  return (
    <footer
      className={cx(
        s.footer,
        "flex flex-col tablet:flex-row items-center tablet:items-end justify-between gap-5 tablet:gap-0"
      )}
    >
      <small>© Stork Motion 2025</small>

      {/* <div className={cx(s.social, "flex items-center justify-center gap-5")}>
        <Link to="/" className={s.iconC}>
          <IconLinkedin fill="var(--black)" />
        </Link>
      </div> */}

      <small>
        Web Solutions Partner{" "}
        <a className="underline" href="https://bytemywork.com">
          Byte My Work
        </a>
      </small>
    </footer>
  )
}
