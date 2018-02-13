import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { standardFont } from 'style/font'
import { connect } from 'lib/store'
import { termStore } from 'pkg/term-browser/term-store'
import { interpolate } from 'lib/term'

const TermDetails = styled(({ title, body, className }) =>
  <div className={className}>
    <TermHeader>{title}</TermHeader>
    <TermContent>{body}</TermContent>
  </div>
).attrs({className: "TermDetails"})`
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

const InlineTerm = styled.span.attrs({className: "InlineTerm"})`
  font-size: 14px;
  font-family: ${standardFont};
  color: #0645AD;

  &:hover {
    color: #3366BB;
    cursor: default;
  }
`

const buildLink = (display, term) =>
  <InlineTerm onClick={() => {
    if (term && term.id) {
      termStore.dispatch("fetchTerm", { termId: term.id }).then(() => {
        termStore.dispatch("selectTerm", { termId: term.id })
      })
    }
  }}>
    {display}
  </InlineTerm>

export default connect(termStore, ({ termCache, selectedTerm }) => ({
  title: selectedTerm ? termCache[selectedTerm].name : "Select a Term",
  body: selectedTerm ? interpolate(termCache, termCache[selectedTerm].value, buildLink) : "To get started, select a term from the left. New terms will be added as they relate to the selected term. The area at the top shows you the trail of terms you've followed so far."
}))(TermDetails)
