import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>AI Agent Custom LLM Demos</h1>
      <p>Select a demo to get started:</p>

      <h2>Basic Demos</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/basic/openai-responses-api" style={{ textDecoration: "none", color: "#0070f3" }}>
            OpenAI Responses API
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/basic/openai-chat-completions-api" style={{ textDecoration: "none", color: "#0070f3" }}>
            OpenAI Chat Completions API
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/basic/vercel-ai-sdk" style={{ textDecoration: "none", color: "#0070f3" }}>
            Vercel AI SDK
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/basic/anthropic-messages" style={{ textDecoration: "none", color: "#0070f3" }}>
            Anthropic Claude Messages API
          </Link>
        </li>
      </ul>

      <h2>Client-Side Tools Demos</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/client-side-tools/openai-responses-api" style={{ textDecoration: "none", color: "#0070f3" }}>
            OpenAI Responses API + Replace Tool
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/client-side-tools/openai-chat-completions-api" style={{ textDecoration: "none", color: "#0070f3" }}>
            OpenAI Chat Completions API + Replace Tool
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/client-side-tools/vercel-ai-sdk" style={{ textDecoration: "none", color: "#0070f3" }}>
            Vercel AI SDK + Replace Tool
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/client-side-tools/anthropic-messages" style={{ textDecoration: "none", color: "#0070f3" }}>
            Anthropic Claude Messages API + Replace Tool
          </Link>
        </li>
      </ul>

      <h2>Server-Side Tools Demos</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/server-side-tools/openai-responses-api" style={{ textDecoration: "none", color: "#0070f3" }}>
            OpenAI Responses API + Weather Tool
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/server-side-tools/openai-chat-completions-api" style={{ textDecoration: "none", color: "#0070f3" }}>
            OpenAI Chat Completions API + Weather Tool
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/server-side-tools/vercel-ai-sdk" style={{ textDecoration: "none", color: "#0070f3" }}>
            Vercel AI SDK + Weather Tool
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link href="/server-side-tools/anthropic-messages" style={{ textDecoration: "none", color: "#0070f3" }}>
            Anthropic Claude Messages API + Weather Tool
          </Link>
        </li>
      </ul>
    </div>
  );
}
