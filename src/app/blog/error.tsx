'use client'

export default function BlogError({ reset }: { reset: () => void }) {
  return <div role="alert" className="mx-auto max-w-4xl space-y-5 px-6 py-16 text-neutral-800 dark:text-neutral-200">
    <h1 className="text-2xl font-semibold">Articles are temporarily unavailable</h1>
    <p>Please try again or read the original articles on DEV Community.</p>
    <button onClick={reset} className="rounded-lg border px-4 py-2">Try again</button>
    <a className="ml-4 text-teal-600 underline" href="https://dev.to/ezzeddinp">Read on DEV</a>
  </div>
}
