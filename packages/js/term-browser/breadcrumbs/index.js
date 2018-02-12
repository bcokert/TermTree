import React from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { text as colorText } from 'style/color';
import { standardFont } from 'style/font';

const Breadcrumbs = styled.div`
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

const CrumbSeparator = styled(
  ({ text, className }) => <span className={className} >{text}</span>
)`
  ${CrumbSegment}
  color: ${colorText.light};
`

const CrumbItem = styled(
  ({ name, id, className }) => <span className={className} >{name}</span>
)`
  ${CrumbSegment}
  color: ${colorText.standard};
`

export default ({ width, crumbs, className }) => <Breadcrumbs className="Breadcrumbs" width={width}>
  {crumbs.reduce((acc, c, i) => {
    if (acc.length > 0) acc.push(<CrumbSeparator key={(i-1)*2 + 1} text=">"/>)
    acc.push(<CrumbItem key={i*2} id={c.id} name={c.name}/>)
    return acc
  }, [])}
</Breadcrumbs>
