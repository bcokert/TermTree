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
    <TermList terms={range(30).map(i => `test${i}`)}/>
    <TermDetails name="Entropy" value="Entropy represents the possible {{term:kinetic_state}} of a {{term:system_of_particles}}. A larger Entropy means there are more possible states the {{term: system_of_particles}} could be in. Entropy is measured from an arbitrary origin value; thus entropies can only be compared if they have the same origin value."/>
  </Content>
</TermBrowser>
