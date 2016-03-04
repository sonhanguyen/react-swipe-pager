import React, { Component } from 'react'
import 'swiper/dist/js/swiper.min'
import 'swiper/dist/css/swiper.min.css'

import $ from './style.css'

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
        ? <div className='swiper-container'>
          <div className='swiper-wrapper'>
            { group(children, cols * rows, cols).map(slides =>
            <div className={'swiper-slide ' + $.slide}>
                { slides.map(row =>
                    <div className={ $.row }>{ row }</div>
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
