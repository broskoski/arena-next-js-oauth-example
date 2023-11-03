import { ArenaBlock, ArenaChannel, ArenaChannelWithDetails, ConnectionData, GetChannelsApiResponse } from 'arena-ts'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useArena } from '../../hooks/useArena'

const CHANNEL_ID = '<your channel id>'

const Container = styled.div`
  padding: 2rem 0;
`

const EntryLine = styled.div`
  font-size: 1.5rem;
`

const LoadMoreButton = styled.button`
  margin-top: 1rem;
  font-size: 1.2rem;
`

type Item = (ArenaBlock | (ArenaChannel & ArenaChannelWithDetails) & ConnectionData)
type Channel = ArenaChannel & ArenaChannelWithDetails
const PER = 100

export const Entries: React.FC = () => {
  const [entries, setEntries] = useState<Item[]>([])
  const arena = useArena()

  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const fetchEntries = useCallback(async () => {
    if (!arena) return
    
    // Fetch channel contents
    arena.channel(CHANNEL_ID).get({ forceRefresh: true, per: PER, page }).then((channel) => {
      // if there are no contents, return
      if (!channel || !channel.contents) return

      // otherwise, set the entries
      const contents = [...entries, ...channel.contents as Item[]]
      setEntries(contents)

      // and check if there are more
      const length = ((channel as unknown) as Channel).length
      setHasMore(length > PER * page)
      setPage(page + 1)
    })
  }, [arena, page])

  useEffect(() => {
    fetchEntries()
  }, [arena])

  return (
    <Container>
      {entries.map((entry) => {
        // this is made to show text blocks, but can be adopted for any type of channels / contents

        if (!entry) return null
        if (entry.base_class !== 'Block' || entry.class !== 'Text') return null
        if (!entry.content) return null
    
        return (
          <div key={entry.id}>
            {entry.base_class === 'Block' && entry.class == 'Text' && (
              <EntryLine><a href={`https://www.are.na/${entry.user.slug}`} target="_blank" rel="noreferrer">{entry.user.username}</a>: {entry.content}</EntryLine>
            )}
          </div>
        )
      })}

      {/* Load more button */}
      {hasMore && (
        <LoadMoreButton onClick={fetchEntries}>Load more</LoadMoreButton>
      )}
    </Container>
  )
}