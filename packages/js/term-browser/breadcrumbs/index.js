import React from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { text as colorText } from 'style/color';
import { standardFont } from 'style/font';
import { termStore } from 'pkg/term-browser/term-store'
import { connect } from 'lib/store'

const Breadcrumbs = styled(({ width, crumbs, className }) =>
  <div className={className} width={width}>
    {crumbs.reduce((acc, c, i) => {
      if (acc.length > 0) acc.push(<CrumbSeparator key={(i - 1) * 2 + 1} text=">" />)
      acc.push(<CrumbItem key={i * 2} onClick={c.onClick} text={c.text} />)
      return acc
    }, [])}
  </div>
).attrs({ className: "Breadcrumbs" }) `
  width: ${p => p.width || '100%'};
  min-height: 30px;
  flex: 0 0 auto;
  display: flex;
  flex-flow: row wrap;
  background-color: #C6AE69;
`

const CrumbSegment = css`
  height: 30px;
  padding: 0 2px;
  font-family: ${standardFont};
  font-size: 16px;
  text-align: center;
  line-height: 30px;
`
const CrumbSeparator = styled(({ text, className }) =>
  <span className={className} >{text}</span>
).attrs({ className: "CrumbSeparator" })`
  ${CrumbSegment}
  color: ${colorText.light};
`

const CrumbItem = styled(({ text, className, onClick }) =>
  <span className={className} onClick={onClick}>{text}</span>
).attrs({ className: "CrumbItem" })`
  ${CrumbSegment}
  color: ${colorText.standard};
  &:hover {
    color: ${colorText.hover};
    cursor: pointer;
  }
`

export default connect(termStore, ({ termCache, breadcrumbs }) => ({
  crumbs: breadcrumbs.map((c, i) => ({
    text: termCache[c].name,
    onClick: () => {
      termStore.dispatch("loadCrumb", { crumbIndex: i })
    }
  }))
}))(Breadcrumbs)
