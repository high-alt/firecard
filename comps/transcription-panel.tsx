import React from 'react'
import ReactPlayer from 'react-player'
import { parseVTT } from 'utils/utils'


interface TranscriptListProps {
	data: string
	videoRef: React.RefObject<ReactPlayer>
	onSeekTo: (timestamp: number) => void
}


export const TranscriptionPanel: React.FC<TranscriptListProps> = ({
  data,
  videoRef,
  onSeekTo,
}) => {
  const entries = React.useMemo(() => parseVTT(data), [data])

  const handleClick = (startTime: number) => {
    if (!videoRef.current) return

    videoRef.current.seekTo(startTime, 'seconds')
    onSeekTo(startTime)
  }

  return (
    <div className="w-full border rounded-md p-2 mx-auto max-h-[500px] overflow-auto">
      {entries.map((entry) => (
        <div key={entry.id} onClick={() => handleClick(entry.startTime)}>
          <p className="cursor-pointer hover:underline">{entry.text}</p>
        </div>
      ))}
      <div className="w-auto mx-auto border rounded-md">
        <div className="max-h-[680px] p-4 overflow-auto space-y-2 bg-white rounded-md">
          {entries.map((entry) => (
            <div key={entry.id} onClick={() => handleClick(entry.startTime)}>
              <p className="cursor-pointer hover:underline">{entry.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
