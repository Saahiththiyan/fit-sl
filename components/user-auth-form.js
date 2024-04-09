import React, { useState } from 'react'

import { cn } from '@/lib/utils'
// import { Icons } from "@/components/icons"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export function UserAuthForm ({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function onSubmit (event) {
    event.preventDefault()
    try {
      const { data: dataUser, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      setIsLoading(true)
      if (dataUser) {
        router.push('/clients')
      }
      if (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              placeholder='password'
              autoCapitalize='none'
              autoComplete='password'
              autoCorrect='off'
              disabled={isLoading}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            Log In with Email
          </Button>
        </div>
      </form>
    </div>
  )
}
