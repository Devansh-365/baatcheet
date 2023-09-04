import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, #E0E7FF 25%, #ffffff 50%, #CFFAFE 75%)",
          }}
          tw="h-full w-full flex flex-col items-center justify-center bg-white"
        >
          <h1
            style={{
              fontSize: "80px",
              fontWeight: 900,
              background:
                "linear-gradient(to bottom right, #000000 21.66%, #78716c 86.47%)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: "5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Baatcheet
          </h1>
          <h2
            style={{
              fontSize: "30px",
              fontWeight: 700,
              lineHeight: "2.2rem",
              letterSpacing: "-0.02em",
              textAlign: "center"
            }}
          >
            Connect Better with Baatcheet: Real-time Chats, Video Calls, and
            Dynamic Channels, Inspired by Discord.
          </h2>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
