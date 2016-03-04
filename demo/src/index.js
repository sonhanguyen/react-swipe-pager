import React from 'react'
import { render } from 'react-dom'

import AutoPager from '../../src'

render(
  <AutoPager direction='vertical'
    style={{
      width: '100%',
      height: '90vh',
    }}>{ Array(137).fill(
      <Item size={40} />
    )}
  </AutoPager>
, document.querySelector('#demo'))

function Item ({ size }) {
  return <div style = {
    {
      borderRadius: '50%',
      height: size,
      width: size,
      backgroundColor: 'red',
      margin: 60
    }
  }/>
}
