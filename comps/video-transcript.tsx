'use client'
import React, {  useEffect, useRef, useState } from 'react'
import { VideoPlayer } from './video-player'
import ReactPlayer from 'react-player'
import { CircularProgress, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { TranscriptionPanel } from './transcription-panel'

export const vttUrl = '/test-subs.vtt'

export const VideoTranscript = () => {
  const playerRef = useRef<ReactPlayer>(null)
  const [data, setData] = useState<string | null>(null)

  const onSeekTo = (timestamp: number) => {
    if (!playerRef.current) return
    const duration = playerRef.current.getDuration()
    const playedPercentage = timestamp / duration
    playerRef.current.seekTo(playedPercentage, 'fraction') // Use 'fraction' to seek by percentage
  }

  useEffect(() => {
    fetch(vttUrl)
			.then((response) => response.text())
			.then((data) => setData(data))
			.catch((error) =>
			  console.error('Error fetching transcription data:', error)
			)
  }, [])

  if (!data) return <CircularProgress />

  return (
    <div className="space-y-4 ">
      <form className="overflow-hidden flex rounded-full border focus-within:border-blue-500 m-2 p-1 items-center pl-4 max-w-[780px] mx-auto bg-white">
        <input
          type="text"
          placeholder="Search your video"
          className="w-full bg-transparent border-none focus:ring-0 "
        />
        <IconButton>
          <SearchIcon color="inherit" />
        </IconButton>
      </form>
      <div className="lg:flex gap-x-4">
        {data && (
          <TranscriptionPanel
            videoRef={playerRef}
            data={data}
            onSeekTo={onSeekTo}
          />
        )}
        <VideoPlayer playerRef={playerRef} />
      </div>
    </div>
  )
}