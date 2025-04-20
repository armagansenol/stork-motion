import cx from "clsx"
import { forwardRef, useImperativeHandle } from "react"
import { AnimatePresence, motion } from "motion/react"

import { IframeVideo } from "@/components/iframe-video"
import { X } from "lucide-react"
export interface VideoModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export interface VideoModalHandle {
  open: () => void
  close: () => void
}

const VideoModal = forwardRef<VideoModalHandle, VideoModalProps>(({ isOpen, setIsOpen }, ref) => {
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cx(
            "fixed top-0 left-0 w-full h-full bg-black/80",
            "flex items-center justify-center",
            "z-[99999]"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute top-4 right-4 cursor-pointer">
            <X className="w-8 h-8 text-white" />
          </div>
          <motion.div
            className="w-full xl:w-4/5 aspect-video rounded-none xl:rounded-2xl overflow-hidden"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <IframeVideo
              aspectRatio="56.6%"
              src="https://player.vimeo.com/video/1076772578?background=1&badge=0&autoplay=1&muted=1&loop=1&player_id=0&app_id=58479"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

VideoModal.displayName = "VideoModal"

export default VideoModal
