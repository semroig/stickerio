import 'server-only'

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="grid h-screen place-items-center">
      <div>
        <h1 className="text-2xl">Landing page</h1>
        <Button>Click me</Button>
      </div>
    </div>
  )
}
