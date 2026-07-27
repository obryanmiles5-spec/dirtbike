import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4 font-mono uppercase">404 - Not Found</h2>
      <p className="text-zinc-400 mb-8">Could not find requested resource</p>
      <Link href="/" className="px-6 py-3 bg-lime-400 text-zinc-950 font-black text-xs uppercase cursor-pointer rounded-lg font-mono">
        Return Home
      </Link>
    </div>
  )
}
