import { MarpOptions } from '@marp-team/marp-core'
import React, { useEffect, useState } from 'react'
import { useStyle, useMarpOptions, useMarpReady } from './utils/hooks'
import { stylingForComponent } from './utils/marp'
import * as parser from './utils/parser'
import { listen, send } from './utils/worker'
import { MarpRendererProps, MarpRenderedSlide, defaultRenderer } from './Marp'

export interface MarpWorkerRendererProps extends MarpRendererProps {
  children?: MarpWorkerRendererRenderProp
  render?: MarpWorkerRendererRenderProp
  worker: Worker
}

export type MarpWorkerRendererRenderProp = (
  slides: MarpRenderedSlide[] | undefined
) => React.ReactNode

const defaultWorkerRenderer: MarpWorkerRendererRenderProp = slides =>
  slides && defaultRenderer(slides)

export const MarpWorker: React.FC<MarpWorkerRendererProps> = props => {
  const { children, markdown, options, render, worker } = props
  const { identifier, containerClass, marpOptions } = useMarpOptions(options)
  const renderer = render || children || defaultWorkerRenderer

  const [rendered, setRendered] = useState<React.ReactNode>(renderer(undefined))
  const [style, setStyle] = useState('')
  const [queue, setQueue] = useState<[string, MarpOptions] | boolean>(false)

  useStyle(`marp-style-${identifier}`, style)
  useMarpReady()

  useEffect(
    () =>
      listen(worker, {
        rendered: ({ slides, css, comments }) => {
          setRendered(
            renderer(
              slides.map((slide, i) => ({
                slide: (
                  <div className={containerClass} key={i}>
                    {parser.render(slide)}
                  </div>
                ),
                comments: comments[i],
              }))
            )
          )
          setStyle(stylingForComponent(css, containerClass))
          setQueue(q => {
            if (q !== false && q !== true) {
              send(worker, 'render', ...q)
              return true
            }
            return false
          })
        },
      }),
    [containerClass, renderer, worker]
  )

  useEffect(() => {
    if (queue) {
      setQueue([markdown || '', marpOptions])
    } else {
      setQueue(true)
      send(worker, 'render', markdown || '', marpOptions)
    }
  }, [markdown, options, renderer, worker])

  return <>{rendered}</>
}

export default MarpWorker
