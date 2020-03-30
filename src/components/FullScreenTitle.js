import React from 'react'

import { Heading } from 'spectacle'

export default function FullScreenTitle(props) {
  return (
    <div className='fst-container'>
      <Heading className='fst-title'>{props.children}</Heading>
    </div>
  )
}
