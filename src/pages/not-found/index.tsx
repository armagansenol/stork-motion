import { Link } from "react-router-dom"
import s from "./not-found.module.scss"

export default function NotFound() {
  return (
    <div className={s.notFound}>
      <h1>NOT FOUND</h1>
      <Link className={s.link} to="/">
        Go to homepage
      </Link>
    </div>
  )
}
