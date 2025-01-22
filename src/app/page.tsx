import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import SetupForm from '@/components/setup-form'

export default function HomePage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>UK Live Departure Boards</CardTitle>
          <CardDescription>
            Find live train times for any UK station
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SetupForm />
        </CardContent>
      </Card>
    </main>
  )
}
