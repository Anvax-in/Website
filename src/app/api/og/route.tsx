import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import React from 'react'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const title = new URL(request.url).searchParams.get('title') ?? 'Sovereign Stack'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px 72px',
          background: '#0B1A2A',       // --ink-900
          position: 'relative',
        }}
      >
        {/* Amber accent bar at top */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '4px',
            background: '#B8843E',     // --amber-600
          }}
        />

        {/* Publication label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: '#C99858',   // --amber-500
            }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#C99858',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Sovereign Stack · Anvax
          </span>
        </div>

        {/* Post title */}
        <div
          style={{
            fontFamily: 'serif',
            fontSize: title.length > 70 ? '38px' : '50px',
            fontWeight: '400',
            color: '#F4F0E5',          // --bone-100
            lineHeight: '1.25',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
