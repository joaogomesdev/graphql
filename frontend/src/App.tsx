import { gql, useQuery } from "@apollo/client";
import { NewUserForm } from "./components/NewUserForm";

export const GET_USERS = gql`
  query { 
    users { 
      id 
      name
    }
  }
`

type User = { 
  id: string
  name: string
}

function App() {
  const { data, loading } = useQuery<{ users: User[]}>(GET_USERS)

  if (loading) {
    return <p>Loading...</p>
  }
  
  return (
    <>
      <ul>
        {data?.users.map(user => <li key={user.id}>{user.name }</li>) }
      </ul>
      <NewUserForm />
    </>
  )
}

export default App
