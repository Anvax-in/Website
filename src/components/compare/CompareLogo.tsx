import Image from 'next/image'
import type { CompareLogo as CompareLogoData } from '@/content/compare/types'
import styles from './CompareLogo.module.css'

export default function CompareLogo({ logo, size = 24 }: { logo: CompareLogoData; size?: number }) {
  if (logo.kind === 'image') {
    return (
      <span className={styles.imgWrap} style={{ width: size, height: size }}>
        <Image src={logo.src} alt={logo.alt} fill sizes={`${size}px`} style={{ objectFit: 'contain' }} />
      </span>
    )
  }
  return (
    <span
      className={styles.monogram}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      role="img"
      aria-label={logo.alt}
    >
      {logo.label}
    </span>
  )
}
