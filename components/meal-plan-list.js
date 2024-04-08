'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {supabase} from '@/lib/supabase'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const MealPlanList = ({getData, mealPlans}) => {
  const router = useRouter()
  useEffect(() => {
    
    getData()
  }, [])
  const deleteMealPlan = async (id) => {
    const { data: meals, error } = await supabase.from('meal-plans').delete().eq('id', id)
    getData()
  }
  
  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Meal plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
          <Table>
              <TableCaption>A list of your Workout Plans.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {mealPlans?.map(mealPlan => {
                return (
                  <TableRow key={mealPlan.id}>
                    <TableCell>{mealPlan.name}</TableCell>
                    <TableCell>
                      <div className='flex just items-center gap-4'>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={mealPlan.clients.avatar_url} alt="Avatar" />
                          <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        {mealPlan.clients.first_name} {mealPlan.clients.last_name}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-4 justify-end">
                        <Button onClick={() => router.push('/meal-plans/' + mealPlan.id)}>View</Button>
                        <Button onClick={() => deleteMealPlan(mealPlan.id)} variant='destructive'>Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
                
              </TableBody>
            </Table>
            
          </div>
        </CardContent>
      </Card>
      
    </>
  )
}

export default MealPlanList
