import Head from 'next/head'
import { useSession } from 'next-auth/react'
import styled from "styled-components"
import { AuthButton } from "../components/AuthButton"
import { Prompt } from '../components/Prompt'
import { Entries } from '../components/Entries'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

export default function Home() {
  const { data, status } = useSession() || {}
  const loading = status === "loading"
  const user = data?.user as any

  return (
    <>
      <Main>
        <Head>
          <title>Are.na (Next.js OAuth example)</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AuthButton />
        
        {loading && <div>Loading</div>}
        {!loading && user && (
          <Prompt user={user} />
        )}

        <Entries />
      </Main>
    </>
  )
}
