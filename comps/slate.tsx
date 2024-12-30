'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { BaseText, createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react'
import { AWSTranscribeOutput, TranscriptItem } from 'utils/types'

const awsTranscribeToSlate = (data: AWSTranscribeOutput): Descendant[] => {
  let content = ''
  data.results.items.forEach((item, index) => {
    content += item.alternatives[0].content

    // Check if the next item is punctuation. If not, add a space.
    if (
      index !== data.results.items.length - 1 &&
			!isPunctuation(data.results.items[index + 1].alternatives[0].content)
    ) {
      content += ' '
    }
  })
  return [
    {
      children: [
        {
          text: content,
        },
      ],
    },
  ]
}

// Helper function to check if a character is punctuation
const isPunctuation = (char: string): boolean => {
  return ['.', ',', '!', '?', ';', ':', '(', ')'].includes(char)
}

const awsTranscribeItems = (data: AWSTranscribeOutput) => {
  return data.results.items
}

export const transcriptionUrl = '/test-transcription.json'

type Props = {
	data: AWSTranscribeOutput
	renderEl: (props: RenderElementProps) => JSX.Element
}

const Editor = ({ data, renderEl }: Props) => {
  const [val, setVal] = useState<Descendant[]>([])
  const editor = useMemo(() => withReact(createEditor()), [])

  const value = data ? awsTranscribeToSlate(data) : []
  return (
    <div className="flex justify-center w-full mx-auto h-[480px] overflow-hidden">
      {data && (
        <Slate
          editor={editor}
          onChange={(newValue) => setVal(newValue)}
          initialValue={value}
        >
          <Editable
            readOnly
            renderElement={renderEl}
            className="w-[780px] overflow-auto"
            placeholder="Enter the transcript..."
          />
        </Slate>
      )}
    </div>
  )
}

export default Editor
