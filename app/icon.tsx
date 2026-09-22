import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#15151a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#f5f5f4',
            fontSize: 20,
            fontWeight: 700,
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            marginTop: -1,
          }}
        >
          B
        </span>
      </div>
    ),
    { ...size }
  );
}
