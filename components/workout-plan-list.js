'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
import { supabase } from '@/lib/supabase'



const WorkoutPlanList = ({getData, workoutPlans}) => {
  const router = useRouter()  
  useEffect(() => {
    
    getData()
  }, [])

  const deleteWorkoutPlan = async (id) => {
    const { data: workouts, error } = await supabase.from('workout-plans').delete().eq('id', id)
    getData()
  }
  
  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Workout plans</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-8">
            <Table>
              <TableCaption>A list of your Workout Plans.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {workoutPlans?.map(workoutPlan => {
                return (
                  <TableRow key={workoutPlan.id}>
                    <TableCell>{workoutPlan.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-4 justify-end">
                        <Button onClick={() => router.push('/workout-plans/' + workoutPlan.id)}>View</Button>
                        <Button onClick={() => deleteWorkoutPlan(workoutPlan.id)} variant='destructive'>Delete</Button>
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

export default WorkoutPlanList