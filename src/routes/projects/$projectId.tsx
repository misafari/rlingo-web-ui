import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/$projectId')({
  loader: ({ params }) => params.projectId,
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/projects/$projectId"!</div>
}
