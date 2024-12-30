'use client'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { IconButton, Tooltip } from '@mui/material'
import PlayIcon from '@mui/icons-material/PlayCircleFilled'
import PauseIcon from '@mui/icons-material/PauseCircleFilled'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeIcon from '@mui/icons-material/VolumeUpRounded'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import { formatTime } from 'utils/utils'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'

type Props = ReactPlayerProps & {
	playerRef: React.RefObject<ReactPlayer>
}
export const testVidSrc = '/vid.mp4'

export const VideoPlayer = ({ playerRef, ...props }: Props) => {
  const playerContainerRef = useRef<HTMLDivElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [played, setPlayed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverPosition, setHoverPosition] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - left // x position within the element.
    const proportion = x / width
    const timeToSeek = proportion * duration

    setHoverTime(timeToSeek)
    setHoverPosition(x) // Store the x position
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    setVolume(newValue / 100)
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

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const clickedPercent = x / rect.width

    const newTime = clickedPercent * duration
    playerRef.current.seekTo(newTime, 'seconds')

    setPlayed(clickedPercent)
  }

  useEffect(() => {
    if (duration !== null) {
      const newPlayed = currentTime / duration
      setPlayed(newPlayed)
    }
  }, [currentTime, duration])

  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds)
  }
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (playerContainerRef.current) {
        playerContainerRef.current.requestFullscreen().catch((err) => {
          console.warn('Error attempting to enable full-screen mode:', err)
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

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    if (playing && window.innerWidth <= 768) {
      // 768px is a common breakpoint for mobile/tablet
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

  const handleButtonKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ') {
      e.preventDefault()
      setPlaying(!playing)
    }
  }

  if (!testVidSrc) return null

  return (
    <div
      ref={playerContainerRef}
      onClick={() => {
        setControlsVisible(!controlsVisible)
        setPlaying(!playing)
      }}
      className="w-full h-full relative bg-black rounded-lg overflow-hidden group"
    >
      <ReactPlayer
        url={testVidSrc}
        ref={playerRef}
        playing={playing}
        volume={volume}
        muted={volume === 0}
        controls={false}
        width={'100%'}
        height={'100%'}
        onDuration={setDuration}
        onEnded={() => {
          setPlaying(false)
          setPlayed(1)
        }}
        onProgress={handleProgress}
        {...props}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full px-2 absolute bottom-0 transform translate-y-full group-hover:translate-y-0 transition-all ease-in-out duration-500 bg-black/40"
      >
        <div
          className="relative w-full h-1.5 bg-white rounded-full cursor-pointer"
          onClick={handleProgressClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
                      name: 'offset',
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
            className="absolute top-0 left-0 h-1.5 rounded-full bg-primary"
            style={{ width: `${played * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between">
          <div className="space-x-2 rounded-lg  bg-black bg-opacity-60 px-2 flex items-center">
            <Tooltip placement="top" title={playing ? 'Pause' : 'Play'}>
              <IconButton
                onKeyDown={handleButtonKeyPress}
                aria-label={playing ? 'Pause' : 'Play'}
                onClick={(e) => {
                  e.stopPropagation()
                  setPlaying(!playing)
                }}
                className="text-white opacity-80 hover:opacity-100 focus:outline-none md:text-xl"
              >
                {playing ? (
									<PauseIcon className="text-white/80 hover:text-white" />
								) : (
									<PlayIcon className="text-white/80 hover:text-white" />
								)}
              </IconButton>
            </Tooltip>
            <div
              className={`flex gap-x-2 relative items-center transition-all duration-200`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation()
                  if (volume === 0) {
                    setVolume(0.8)
                  } else setVolume(0)
                }}
                className="text-white focus:outline-none"
              >
                {volume === 0 ? (
									<VolumeOffIcon className="text-white/80 hover:text-white" />
								) : volume > 0 && volume < 0.5 ? (
									<VolumeDownIcon className="text-white/80 hover:text-white" />
								) : (
									<VolumeIcon className="text-white/80 hover:text-white" />
								)}
              </IconButton>
              {isHovered && (
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  className="range h-1.5  cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
              )}
            </div>
            <div className="flex text-white/80 text-xs gap-x-2">
              <span>{formatTime(currentTime)}</span> /
              <span>{formatTime(duration)}</span> {/* Finish time */}
            </div>
          </div>
          <Tooltip placement="top" title={'Fullscreen'}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation() 
                toggleFullscreen()
              }}
              className="text-white focus:outline-none"
            >
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
