'use client'
import { useEffect, useRef } from 'react'
import { mountSilkFlock } from './silk-flock'

export default function SilkFlock({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => (ref.current ? mountSilkFlock(ref.current) : undefined), [])
  return <canvas ref={ref} aria-hidden="true" className={className} style={{ aspectRatio: '1 / 1', display: 'block' }} />
}
