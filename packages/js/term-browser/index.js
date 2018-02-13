import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { range } from 'lib/range'

import Breadcrumbs from 'pkg/term-browser/breadcrumbs'
import TermList from 'pkg/term-browser/term-list'
import TermDetails from 'pkg/term-browser/term-details'

const TermBrowser = styled.div.attrs({className: "TermBrowser"})`
  width: ${p => p.width || '100%'};
  height: ${p => p.height || '100%'};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
`

const Content = styled.div.attrs({className: "Content"})`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row nowrap;
`

export default ({ width, height }) => <TermBrowser width={width} height={height}>
  <Breadcrumbs crumbs={range(20).map(i => ({ name: `test${i}`, id: `${i}` }))}/>
  <Content>
    <TermList />
    <TermDetails />
  </Content>
</TermBrowser>
