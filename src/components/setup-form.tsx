'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { stations } from '@/lib/stations'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const formSchema = z.object({
  station: z.string().nonempty(),
  board: z.enum(['departures', 'arrivals', 'all'])
})

export default function SetupForm() {
  const router = useRouter()
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      router.push(`/${values.station.toLowerCase()}/${values.board}`)
    } catch (error) {
      console.error('Form submission error', error)
    }
  }

  function handleSelectStation(station: string) {
    form.setValue('station', station)
    setIsCommandOpen(false)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8"
      >
        <FormField
          control={form.control}
          name="station"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Station</FormLabel>
              <Popover open={isCommandOpen} onOpenChange={setIsCommandOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? stations.find(
                            (station) => station.crsCode === field.value
                          )?.stationName
                        : 'Select station'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[340px] p-0 lg:w-[400px]">
                  <Command>
                    <CommandInput placeholder="Search station..." />
                    <CommandList>
                      <CommandEmpty>No station found.</CommandEmpty>
                      <CommandGroup>
                        {stations.map((station) => (
                          <CommandItem
                            value={station.stationName}
                            key={station.crsCode}
                            onSelect={() => {
                              handleSelectStation(station.crsCode)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                station.crsCode === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {station.stationName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="board"
          control={form.control}
          defaultValue="all"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type of board:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Departures & Arrivals
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="departures" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Just Departures
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="arrivals" />
                    </FormControl>
                    <FormLabel className="font-normal">Just Arrivals</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
