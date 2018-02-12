import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { standardFont } from 'style/font'

const TermDetails = styled.div.attrs({className: "TermDetails"})`
  width: 80%;
  flex: 0 1 auto;
  padding: 12px;
  background-color: #fafafa;

  display: flex;
  flex-flow: column nowrap;
  overflow-y: scroll;
`

const TermHeader = styled.div.attrs({className: "TermHeader"})`
  width: 100%;
  height: 40px;
  line-height: 40px;
  flex: 0 0 auto;

  font-size: 22px;
  font-family: ${standardFont};
`

const TermContent = styled.div.attrs({className: "TermContent"})`
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  
  font-size: 14px;
  font-family: ${standardFont};
`

export default ({ name, value }) => <TermDetails>
  <TermHeader>{name}</TermHeader>
  <TermContent>{value}</TermContent>
</TermDetails>
