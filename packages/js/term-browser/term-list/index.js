import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { standardFont } from 'style/font'
import { text as colorText } from 'style/color'
import { connect } from 'lib/store'
import { termStore } from 'pkg/term-browser/term-store'

const TermList = styled(
  ({ termItems = [], className }) => <div className={className}>{termItems.map(t => <TermItem key={t.id} onClick={t.onClick}>{t.text}</TermItem>)}</div>
).attrs({ className: "TermList" })`
  height: 100%;
  min-width: 140px;
  flex: 1 1 auto;

  overflow-y: scroll;
  background-color: #E1CF99;
`

const TermItem = styled.div.attrs({className: "TermItem"})`
  height: 24px;
  line-height: 24px;
  max-width: 100%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 6px;
  padding: 0 8px;
  font-family: ${standardFont};
  font-size: 12px;
  color: ${colorText.standard};
  background-color: #FFF9E7;

  &:hover {
    background-color: #FFFFfD;
    cursor: pointer;
  }
`

export default connect(termStore, state => ({
  termItems: Object.values(state.termCache).map(t => ({
    id: t.id,
    text: t.name,
    onClick: () => {
      termStore.dispatch("fetchTerm", { termId: t.id }).then(() => {
        termStore.dispatch("selectTerm", { termId: t.id })
      })
    }
  }))
}))(TermList)
