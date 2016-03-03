import React, { Component } from 'react'
import 'swiper/dist/js/swiper.min'
import 'swiper/dist/css/swiper.min.css'

export class SwipePager extends Component {
  componentDidMount() {
    this.componentDidUpdate()
  }
  
  componentWillUnmount() {
     this._swiper.destroy()
  }
  
  componentDidUpdate() { 
    if(this._swiper) this._swiper.destroy()
    // TODO: better lifecycle
    if(this.props.children.length) { 
        this._swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            scrollbar: '.swiper-scrollbar',
            ...this.props
        })
    }
  }

  render({ children, onLayout, rows, cols, ...props } = this.props) {
    if(onLayout) props.ref = onLayout

    return <div { ...props }>
      { children.length
        ?<div className='swiper-container'>
          <div className='swiper-wrapper'>
            { group(children, cols * rows, cols).map(slides =>
            <div className={'swiper-slide ' + $.slide}> 
                { slides.map(row =>
                    <div className={$.row}>{ row }</div>
                )}</div>
            )}</div>
            <div className='swiper-pagination' />
          <div className='swiper-scrollbar'></div>
        </div>
        : children
      }
    </div>
  }
}

export default class AutoPager extends Component {
    constructor(props) { super(...arguments)
        var w, h;
        this.state = {}
        this.__onLayout = e => {
            if(!e) return; 
            
            this.setState({
                cols: Math.floor(e.clientWidth/w),
                rows: Math.floor(e.clientHeight/h)
            })
        }
        
        this.__onItemLayout = e => {
            if(!e) return; 
            w = e.offsetWidth
            h = e.offsetHeight
        }
    }

    render(props = this.props) {
        const { cols, children } = props = { ...this.state, ...props }
        
        if(cols) return <SwipePager { ...props } />
        props.onLayout = this.__onLayout
        
        return <SwipePager { ...props }>
          <div ref={ this.__onItemLayout }
            className={ $.item }>
            { children[0] }
          </div>
        </SwipePager>
    }
}

const $ = require('csjs-inject')`
  .item { display: inline-block }
  .row {
      display: flex;
      justify-content: center;
  }
  .slide { display: block }
`

function headStyle(css) {
   document.head.innerHTML += `<style>${css}</style>`
}

function group(array, n, ...rest) {
    var i = 0, result = [],
        { length } = array
        
    while(i < length) {
        var g = array.slice(i, i += n)
        if(rest.length) g = group(g, ...rest)
        result.push(g)
    }
    return result
}

const Item = ({ size }) =>
  <div style = {
    {
      borderRadius: '50%',
      height: size,
      width: size,
      backgroundColor: 'red',
      margin: 20
    }
  }/>

export default props =>
  <AutoPager direction='vertical'
    style={{
      width: '100%',
      height: '90vh'
    }}>{ Array(137).fill(
      <Item size={40} />
    )}
  </AutoPager>

headStyle`
   .swiper-container { height: 100% }
   .swiper-slide { }
`