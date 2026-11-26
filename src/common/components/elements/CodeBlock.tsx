'use client'

import { useRef, useState, type ReactNode } from 'react'

export default function CodeBlock({ children }: { children?: ReactNode }) {
  const code = useRef<HTMLPreElement>(null)
  const [status, setStatus] = useState('Copy')
  async function copy() {
    try {
      await navigator.clipboard.writeText(code.current?.textContent ?? '')
      setStatus('Copied')
    } catch {
      setStatus('Select code to copy')
    }
  }
  return <div className="relative my-6 overflow-hidden rounded-lg bg-neutral-950 text-neutral-100">
    <div className="flex justify-end border-b border-neutral-800 px-3 py-2">
      <button type="button" onClick={copy} className="rounded px-2 py-1 text-sm hover:bg-neutral-800" aria-label="Copy code to clipboard">
        <span role="status">{status}</span>
      </button>
    </div>
    <pre ref={code} className="overflow-x-auto p-5 text-sm leading-7" tabIndex={0}>{children}</pre>
  </div>
}
