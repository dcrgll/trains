import SetupForm from '@/components/setup-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function HomePage() {
  return (
    <main className='flex h-[calc(100vh-4rem)] items-center justify-center px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>UK Live Departure Boards</CardTitle>
          <CardDescription>
            View live train data for any UK station.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SetupForm />
        </CardContent>
      </Card>
    </main>
  )
}
