import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionPrpos = CSSTransitionProps & {
  animation?: AnimationName,
  wrapper?: boolean,
  children?: ReactNode
}

const Transition = ({ 
  children,
  classNames,
  animation,
  wrapper,
  unmountOnExit= true,
  appear = true,
  ...restProps
}:TransitionPrpos) => {
  return (
    <CSSTransition
       classNames = { classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
      {/*元素身上本来就有动画属性，就用div包裹起来，将属性作用到盒子上，使得动画生效*/}
    </CSSTransition>
  )
}

export default Transition