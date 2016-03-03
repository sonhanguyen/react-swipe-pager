import React, { Component } from 'react'
import _ from 'lodash'
const ResizeSensor = require('css-element-queries/src/ResizeSensor')
import './style.css'

class SwipePager extends Component {
   constructor(props) { super(props)
      this.state = {}
   }

   componentDidMount() {
      this.setState({ split: this.__calculateGrid() })
   }

   componentDidUpdate(props, { direction }) {
      console.log(this._size)
      if(this._swiper) return;

      this._swiper = new Swiper ('.swiper-container', {
         direction,
         pagination: '.swiper-pagination',
         scrollbar: '.swiper-scrollbar',
         ...props
      })
   }

   __calculateGrid() {
      let { w, h } = this._itemSize
      return Math.floor(this._size.w / w)*Math.floor(this._size.h / h)
   }

   __renderItems(children) {
      const content = [], { split } = this.state
      let i = 0

      const props = {
         style: { display: 'inline-block' }
      }

      if(split) {
         while(i < children.length) {
            content.push(children.slice(i, i += split))
         }
      } else {
         content.push(children.slice(0, 1)) // render for calculating layout
         props.ref = e => {
            if(!e) return;
            this._itemSize = { w: e.clientWidth, h: e.clientHeight }
         }
      }

      return <div className='swiper-wrapper'>
         { content.map(items =>
            <div className='swiper-slide'>
               { items.map(item =>
                  <div {...props}>
                     { item }
                  </div>
               )}
            </div>
         )}
      </div>
   }

   __onLayout(e) {
      const {props, state, _swiper} = this
      const { w, h } = this._size = { w: e.clientWidth, h: e.clientHeight }

      const direction = props.direction || w < h
        ? 'vertical'
        : 'horizontal'

      if(_swiper) {
         const split = this.__calculateGrid()

         if(split != state.split && direction == _swiper.params.direction) return;

         this._swiper.destroy(true, true)
         this._swiper = false
         this.direction = direction
         this.setState({ split, direction })
      }
   }

   render({ children, ...props} = this.props) {
      return <div {...props}
            ref={e => {
               if(!e) return;
               new ResizeSensor(e, _.throttle(this.__onLayout.bind(this, e), 1000))
               this.__onLayout(e)
            }}>

         <div className='swiper-container'>
            {this.__renderItems(children)}
            <div className='swiper-pagination'></div>
            <div className='swiper-scrollbar'></div>
         </div>
      </div>
   }
}

const Item = ({size}) =>
   <div style={{
      borderRadius: '50%',
      height: size,
      width: size,
      backgroundColor: 'orange',
      margin: 20
   }}/>


export default props =>
   <BlurryContainer>
      <SwipePager style={{
            width: '100%',
            height: '90vh',
            margin: 'auto'
         }}>{ Array(200).fill(
         <Item size={40}/>
      )}
      </SwipePager>
   </BlurryContainer>

function BlurryContainer({children, ...props}) {
   props.style = {
      backgroundImage: `url(${require('./misen.jpg')})`,
      '-webkit-filter': 'blur(5px)',
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%'
   }
   return <div>
      <div className='blur-background' {...props} />
      { children }
   </div>
}
