import React from 'react'
import ReactDOM from 'react-dom'
import { debouce } from 'lib/debounce'

import TermBrowser from 'pkg/term-browser'

const root = document.querySelector('#app');
root.style.width = window.innerWidth + "px";
root.style.height = window.innerHeight - 20+ "px";

window.addEventListener('resize', debouce(() => {
  root.style.width = window.innerWidth + "px";
  root.style.height = window.innerHeight - 20 + "px";
}, 1000));

ReactDOM.render(<TermBrowser height="500px" width="800px"/>, root)
