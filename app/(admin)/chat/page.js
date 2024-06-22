'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Chat = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: users, error } = await supabase.from('clients').select('*, profiles(*)')
      if (error) console.error(error)
      else setUsers(users)
    }
    
    fetchUsers()
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user)).catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        const { data: messages, error } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_id.eq.${selectedUser.profiles[0].id},receiver_id.eq.${selectedUser.profiles[0].id}`)
          .order('created_at', { ascending: true })
        if (error) console.error(error)
        else setMessages(messages)
      }

      fetchMessages()

      const messageSubscription = supabase
        .channel('public:messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
          console.log(payload);
          console.log(messages);
          if (payload.new.sender_id === selectedUser.profiles[0].id || payload.new.receiver_id === selectedUser.profiles[0].id) {
            console.log('message set');
            setMessages(prev => [...prev, payload.new])
          }
        })
        .subscribe()

      return () => {
        supabase.removeChannel(messageSubscription)
      }
    }
  }, [selectedUser])

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const { error } = await supabase.from('messages').insert([{ sender_id: user?.id, receiver_id: selectedUser.profiles[0].id, content: newMessage }])
      if (error) console.error(error)
      else setNewMessage("")
    }
  }

  return (
    <main className='flex h-[calc(100vh-64px)]'>
      <div className='w-1/4 p-4 h-full overflow-y-auto'>
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div>
              {users.map(user => (
                <div key={user.id}>
                  <div onClick={() => setSelectedUser(user)} className={`flex gap-2 mb-2 rounded-lg p-2 border-solid border border-green-200 items-center ${user.id === selectedUser?.id && 'bg-green-200'}`}>
                    <Avatar className='h-8 w-8'>
                      <AvatarImage src={user?.avatar_url} alt={user?.username} />
                      <AvatarFallback>{user?.full_name}</AvatarFallback>
                    </Avatar>
                    <div>{user.first_name} {user.last_name}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='w-3/4 p-4 h-full overflow-y-auto'>
        {selectedUser ? (
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Chat with {selectedUser.first_name} {selectedUser.last_name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden">
              <div className='flex-1 overflow-y-auto'>
                {messages.map(msg => (
                  <div key={msg.id} className={`mb-4 ${msg.sender_id === user?.id ? 'text-right' : ''}`}>
                    <p className={`inline-block ${msg.sender_id === user?.id ? 'bg-green-200' : 'bg-slate-100'} p-2 rounded-md`}>{msg.content}</p>
                  </div>
                ))}
              </div>
              <div className='mt-4 flex gap-2'>
                <input
                  type='text'
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder='Type a message'
                  className='flex-grow p-2 border border-gray-300 rounded-md'
                />
                <Button onClick={sendMessage} className='rounded-r-md'>Send</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Select a user to chat with</CardTitle>
            </CardHeader>
          </Card>
        )}
      </div>
    </main>
  )
}

export default Chat
