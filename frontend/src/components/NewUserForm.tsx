import { gql, useMutation } from '@apollo/client';
import React, { FormEvent, useState } from 'react';
import { GET_USERS } from '../App';
import { client } from '../services/apollo';

const CREATE_USER = gql`
  mutation ($name: String!){
    createUser(name: $name){
      id
      name
    }
  }
`

export function NewUserForm() {
  const [name, setName] = useState('')
  const [createUser, { data, error, loading }] = useMutation(CREATE_USER)
  
  async function handleCreateUser(event: FormEvent) {
    event.preventDefault()

    if (!name) {
      return
    }

    await createUser({
      variables: {
        name
      },
      update: (cache, { data: { createUser }}) => {
        const { users } = client.readQuery({ query: GET_USERS })
        
        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: {
              ...users,
              createUser
            }
          }
        })
      }
    })
  }

  return (
    
    <>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}