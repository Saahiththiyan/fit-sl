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
import { supabase } from '@/lib/supabase'


const WorkoutList = ({getData, workouts}) => {
  
  useEffect(() => {
    
    getData()
  }, [])

  const deleteWorkout = async (id) => {
    const { data: workouts, error } = await supabase.from('workouts').delete().eq('id', id)
    getData()
  }
  
  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Workouts</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-8">
            <Table>
              <TableCaption>A list of your Workouts.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Workout</TableHead>
                  <TableHead>Sets</TableHead>
                  <TableHead>Reps</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {workouts?.map(workout => {
                return (
                  <TableRow key={workout.id}>
                    <TableCell>{workout.name}</TableCell>
                    <TableCell>{workout.sets}</TableCell>
                    <TableCell>{workout.reps}</TableCell>
                    <TableCell>{workout.duration}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-4 justify-end">
                        <Button onClick={() => deleteWorkout(workout.id)} variant='destructive'>Delete</Button>
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

export default WorkoutList
