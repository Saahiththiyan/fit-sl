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
import { mealTypes } from '@/data/util'


const MealList = ({getData, meals}) => {
  
  useEffect(() => {
    
    getData()
  }, [])

  const deleteMeal = async (id) => {
    const { data: meals, error } = await supabase.from('meals').delete().eq('id', id)
    getData()
  }
  
  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Meals</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-8">
            <Table>
              <TableCaption>A list of meals.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Meal</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {meals?.map(meal => {
                return (
                  <TableRow key={meal.id}>
                    <TableCell>{meal.name}</TableCell>
                    <TableCell>{mealTypes.find(mealtype => mealtype.id == meal.type)?.name}</TableCell>
                    <TableCell>{meal.weight}g</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-4 justify-end">
                        <Button onClick={() => deleteMeal(meal.id)} variant='destructive'>Delete</Button>
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

export default MealList
