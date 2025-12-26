import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
}
