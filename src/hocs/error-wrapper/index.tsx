import s from "./error-wrapper.module.scss"

import { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useQueryErrorResetBoundary } from "react-query"

type Props = {
  children: ReactNode
}

const ErrorWrapper = (props: Props) => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className={s.errorMessage}>
          <h1>
            Ooops! <span>Something went wrong.</span>
          </h1>
          <div onClick={() => resetErrorBoundary()}>
            <button>Try Again</button>
          </div>
        </div>
      )}
    >
      {props.children}
    </ErrorBoundary>
  )
}

export default ErrorWrapper
