'use client'

import React, { useEffect, useState } from 'react'
import {supabase} from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { genderList } from '@/data/util'
import WeightGraph from '@/components/weight-graph'

const Clients = ({params}) => {
const [client, setClient] = useState(null)
  useEffect(() => {
    const getData = async () => {
      const { data: client, error } = await supabase.from('clients').select('*, weight-data(*)').eq('id', params.clientId).single()
      console.log(client);
      setClient(client)
    }
    getData()
  }, [])
  return (
    <>
      <main className='flex min-h-screen flex-col gap-8 p-24'>
        {client && (
          <>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>{client.first_name} {client.last_name} Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex'>
                <div className="flex-1 space-y-4">
                  <div>Client name: <b>{client.first_name} {client.last_name}</b></div>
                  <div>Gender: <b>{genderList[client.gender]}</b></div>
                  <div>Starting weight: <b>{client.current_weight} kg</b></div>
                  <div>Target weight: <b>{client.weight_goal} kg</b></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>Height: <b>{client.height} cm</b></div>
                  <div>Email: <b>{client.email}</b></div>
                </div>

              </div>

            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>{client.first_name} {client.last_name} Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex'>
                <div className="space-y-4 h-40">
                  <img className="h-full" src={client.body_image1} alt="" />
                </div>
                <div className="space-y-4 h-40">
                  <img className="h-full" src={client.body_image2} alt="" />
                </div>

              </div>

            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>{client.first_name} {client.last_name} Progress (Weight)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex h-96'>
                <WeightGraph data={client['weight-data']}/>
              </div>

            </CardContent>
          </Card>
          </>
          
        )}
        
      </main>
    </>
  )
}

export default Clients