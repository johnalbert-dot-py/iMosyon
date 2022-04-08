import React from 'react'

import styled from 'styled-components'

const EmojiCircleWrapper = styled.div`
  width: 65px;
  height: 65px;
  font-size: 30px;
  padding-top: 4px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.background ? props.background : 'red')};
`

export const EmojiCircle = ({ emoji, background }) => {
  return (
    <EmojiCircleWrapper background={background}>{emoji}</EmojiCircleWrapper>
  )
}

export default EmojiCircle
