import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { standardFont } from 'style/font'
import { text as colorText } from 'style/color';

const TermList = styled.div.attrs({ className: "TermList" })`
  height: 100%;
  min-width: 100px;
  flex: 1 1 auto;

  overflow-y: scroll;
  background-color: #E1CF99;
`

const TermItem = styled.div.attrs({className: "TermItem"})`
  height: 24px;
  line-height: 24px;
  margin: 6px;
  padding: 0 8px;
  font-family: ${standardFont};
  font-size: 16px;
  color: ${colorText.standard};
  background-color: #FFF9E7;
`

export default ({ terms }) => <TermList>{terms.map(t => <TermItem>{t}</TermItem>)}</TermList>
