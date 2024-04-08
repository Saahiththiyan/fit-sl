'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { supabase } from '@/lib/supabase'

const MealDialog = ({getData, mealPlanId}) => {
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [open, setOpen] = useState(false);
  
  const insertMeal = async () => {
    const { data, error } = await supabase
    .from('meals')
    .insert([
      { name: name, weight: weight, meal_plan_id: mealPlanId }
    ])
    .select()
    getData()
    setOpen(false)

  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button onClick={() => setOpen(true)}>Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new meal</DialogTitle>
          <DialogDescription>
            Create a new meal
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Meal name
            </Label>
            <Input
              id="name"
              placeholder=""
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Weight
            </Label>
            <Input
              id="name"
              placeholder=""
              className="col-span-3"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => insertMeal()}>Create New</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default MealDialog