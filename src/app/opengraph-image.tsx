import { ImageResponse } from 'next/og'

export const alt = "Mohammad Ezzeddin Pratama's software engineering portfolio"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100%', padding: '80px', background: '#102c2b', color: '#f5f5f5' }}>
      <div style={{ fontSize: 24, color: '#5eead4', marginBottom: 32 }}>SOFTWARE ENGINEERING · BACKEND SYSTEMS · AI</div>
      <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.15 }}>Mohammad Ezzeddin Pratama</div>
      <div style={{ fontSize: 28, color: '#d4d4d4', marginTop: 32 }}>Selected projects, technical writing, and continued learning.</div>
      <div style={{ fontSize: 24, color: '#5eead4', marginTop: 40 }}>zeds.studio</div>
    </div>,
    size,
  )
}
