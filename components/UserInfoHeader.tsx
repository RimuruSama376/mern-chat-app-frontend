import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px red solid;
  width: fit-content;
  align-items: center;
  padding: 10px;
  font-size: 24px;
`

const Image = styled.div`
  margin: 10px;
  border: 1px red solid;
  border-radius: 99px;
  height: 60px;
  width: 60px;
  background-color: #8a7d7d;
`

function userInfoHeader() {
  const user = useSelector((state: any) => state.user)
  console.log(user)
  return (
    <Container>
      <Image></Image>
      {user.name}
    </Container>
  )
}

export default userInfoHeader
