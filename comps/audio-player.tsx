import React, { useEffect, useRef, useState } from 'react'
import {Howler, Howl} from 'howler'
import { IconButton, Tooltip } from '@mui/material'
import PlayIcon from '@mui/icons-material/PlayCircleFilled'
import PauseIcon from '@mui/icons-material/PauseCircleFilled'

type Props = {}

export const AudioPlayer = (props: Props) => {
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)
  const soundRef = useRef<Howl | null>(null)

  
  const updateProgress = React.useCallback(() => {
    if (soundRef.current && playing) {
      setProgress((soundRef.current.seek() as number) / soundRef.current.duration() * 100);
      requestAnimationFrame(updateProgress);
    }
  },[soundRef, playing])

  useEffect(() => {
    // Initialize Howl
    soundRef.current = new Howl({
      src: ['https://example.com/path/to/audio.mp3'], 
      loop: false,
      volume: volume,
      onend: () => setPlaying(false),
      onplay: () => {
        requestAnimationFrame(updateProgress);
      },
    });

    return () => {
      soundRef.current?.unload()
    };
  }, [volume, soundRef, updateProgress])


  const handlePlayPause = () => {
    if (playing) {
      soundRef.current?.pause()
    } else {
      soundRef.current?.play()
    }
    setPlaying(!playing);
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    soundRef.current?.volume(newVolume);
  }

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(event.target.value);
    setProgress(newProgress);
    soundRef.current?.seek(newProgress / 100 * (soundRef.current?.duration() || 0));
  }


  return (
    <section className='bg-primary w-full mx-auto'>

      <Tooltip placement="top" title={playing ? 'Pause' : 'Play'}>
			  <IconButton
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={handlePlayPause}
          className="text-black opacity-80 hover:opacity-100 focus:outline-none md:text-xl  text-[54px]"
        >
          {playing ? <PauseIcon fontSize='inherit' /> : <PlayIcon fontSize='inherit'/>}
        </IconButton>
      </Tooltip>
      <div className='flex mx-auto justify-center'>
        <Tooltip title='Volume'>
          <label>

            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={volume} 
              onChange={handleVolumeChange} 
            />
          </label>
        </Tooltip>

        <Tooltip title='Seek'>

          <label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              step="0.1" 
              value={progress} 
              onChange={handleProgressChange} 
            />
          </label>
        </Tooltip>
        <p>
          {`Time: ${Math.round((progress / 100) * (soundRef.current?.duration() || 0))}/${Math.round(soundRef.current?.duration() || 0)}`}
        </p>
      </div>
    </section>
  )
}