import React from 'react'
import { getSession } from '@auth0/nextjs-auth0';


type Props = {
  children: React.ReactNode
}


export const Auth0Provider = async ({ children }: Props) => {
  const session = await getSession()
  console.log(session);
  return (
    <div>{children}</div>
  )
}
