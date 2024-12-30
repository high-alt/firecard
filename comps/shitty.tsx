"use client"
import React, { useEffect, useRef, useState } from "react"
import ReactPlayer, { ReactPlayerProps } from "react-player"
import { CircularProgress, IconButton, Tooltip } from "@mui/material"
import PlayIcon from "@mui/icons-material/PlayCircleFilled"
import PauseIcon from "@mui/icons-material/PauseCircleFilled"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import VolumeIcon from "@mui/icons-material/VolumeUpRounded"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import VolumeDownIcon from "@mui/icons-material/VolumeDown"
import { formatTime } from "utils/utils"

type Props = ReactPlayerProps & {
  playerRef: React.RefObject<ReactPlayer>
}
export const testVidSrc = "/vid.mp4"

export const VideoPlayer = ({ playerRef, ...props }: Props) => {
  const playerContainerRef = useRef<HTMLDivElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [played, setPlayed] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showIconFlash, setShowIconFlash] = useState(false)
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverPosition, setHoverPosition] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    setVolume(newValue / 100) // Convert to a value between 0 and 1
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - left // x position within the element.
    const proportion = x / width
    const timeToSeek = proportion * duration

    setHoverTime(timeToSeek)
    setHoverPosition(x) // Store the x position
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => {
    setIsHovering(false)
    setHoverTime(null) // Clear the hover time.
  }

  const handleProgressClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!playerRef.current) return

    // Calculate click position within the progress bar
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left // x position within the element
    const clickedPercent = x / rect.width

    // Seek to the clicked position
    const newTime = clickedPercent * duration
    playerRef.current.seekTo(newTime, "seconds") // Using the ReactPlayer's seekTo function

    // Update played percentage
    setPlayed(clickedPercent)
  }

  const togglePlayPause = () => {
    setPlaying((prev) => !prev)
    setShowIconFlash(true)
    setTimeout(() => setShowIconFlash(false), 500) // hide the icon after 500ms
  }

  const increaseVolume = () => {
    setVolume((prev) => Math.min(prev + 0.1, 1))
  }

  const decreaseVolume = () => {
    setVolume((prev) => Math.max(prev - 0.1, 0))
  }

  const seekForward = () => {
    // Assuming playerRef.current.seekTo exists and you can use it
    const newTime = currentTime + 10
    if (playerRef && playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(newTime, "seconds")
    }
  }

  const seekBackward = () => {
    const newTime = currentTime - 10
    if (playerRef && playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(newTime, "seconds")
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (playerContainerRef.current) {
        playerContainerRef.current.requestFullscreen().catch((err) => {
          console.warn("Error attempting to enable full-screen mode:", err)
        })
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    if (playing && window.innerWidth <= 768) {
      const timeout = setTimeout(() => {
        setControlsVisible(false)
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [playing, controlsVisible])

  useEffect(() => {
    if (controlsVisible) {
      const timeout = setTimeout(() => {
        setControlsVisible(false)
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [controlsVisible])

  if (!testVidSrc) return <CircularProgress />

  return (
    <div
      ref={playerContainerRef}
      onClick={() => {
        setControlsVisible(!controlsVisible)
        setPlaying(!playing)
      }}
      className="w-full h-[380px] relative bg-black rounded-lg overflow-hidden group"
    >
      <ReactPlayer
        url={testVidSrc}
        ref={playerRef}
        playing={playing}
        played={played}
        volume={volume}
        muted={volume === 0}
        controls={false}
        width={"100%"}
        height={"100%"}
        onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        onDuration={setDuration}
        onEnded={() => {
          setPlaying(false)
          setPlayed(1)
        }}
        {...props}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full px-2 absolute bottom-1 transform translate-y-full group-hover:translate-y-0 transition-all ease-in-out duration-500"
      >
        <div
          className="relative w-full h-1.5 hover:h-2 bg-white rounded-full cursor-pointer group"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleProgressClick}
        >
          {isHovering && hoverTime !== null && hoverPosition !== null && (
            <Tooltip
              title={formatTime(hoverTime)}
              placement="top"
              arrow
              open={isHovering}
              PopperProps={{
                popperOptions: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [hoverPosition, 10],
                      },
                    },
                  ],
                },
              }}
            >
              <span className="absolute"></span>
            </Tooltip>
          )}
          <div
            className="absolute top-0 left-0 h-1.5 rounded-full bg-honeydew"
            style={{ width: `${played * 100}%` }}
          ></div>
          <div className="flex text-white text-xs mx-2">
            <span>{formatTime(currentTime)}</span> /
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <IconButton
        onClick={(e) => {
          e.stopPropagation()
          toggleFullscreen()
        }}
        className="text-white focus:outline-none"
      >
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </div>
  )
}
