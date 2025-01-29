'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Select from '@/components/ui/select'
import { stations } from '@/lib/stations'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  station: z.object({
    label: z.string(),
    value: z.string()
  }),
  board: z.enum(['departures', 'arrivals', 'all'])
})

export default function SetupForm() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      router.push(`/${values.station.value.toLowerCase()}/${values.board}`)
    } catch (error) {
      console.error('Form submission error', error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto max-w-3xl space-y-8'
      >
        <FormField
          name='station'
          control={form.control}
          render={({ field }) => (
            <FormItem className='flex w-full flex-col'>
              <FormLabel>Station</FormLabel>
              <Select
                {...field}
                placeholder='Select station...'
                options={stations}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='board'
          control={form.control}
          defaultValue='all'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Type of board:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='all' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      Departures & Arrivals
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='departures' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      Just Departures
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='arrivals' />
                    </FormControl>
                    <FormLabel className='font-normal'>Just Arrivals</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className={cn(
            'w-full',
            loading ? 'cursor-not-allowed opacity-50' : 'hover:cursor-pointer'
          )}
        >
          {loading ? (
            <Loader2 className='h-5 w-5 animate-spin text-background' />
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </Form>
  )
}
