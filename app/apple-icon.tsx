import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: '#111827',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 120,
            fontWeight: 900,
            fontFamily: 'Georgia, "Times New Roman", serif',
            lineHeight: 1,
            marginTop: -4,
            letterSpacing: '-2px',
          }}
        >
          B
        </span>
      </div>
    ),
    { ...size }
  );
}
