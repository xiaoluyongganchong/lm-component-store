import React, { ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

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
  const nodeRef = useRef<HTMLElement | null>(null);
  const transitionClassNames = classNames ? classNames : animation;

  const renderChildren = () => {
    if (wrapper) {
      return <div ref={nodeRef as React.RefObject<HTMLDivElement>}>{children}</div>;
    }
    if (React.isValidElement(children) && typeof children.type === 'string') {
      return React.cloneElement(children, {
        ref: nodeRef
      } as React.HTMLAttributes<HTMLElement> & { ref: typeof nodeRef });
    }
    return <span ref={nodeRef as React.RefObject<HTMLSpanElement>}>{children}</span>;
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={transitionClassNames}
      unmountOnExit={unmountOnExit}
      appear={appear}
      {...restProps}
    >
      {renderChildren()}
      {/*元素身上本来就有动画属性，就用div包裹起来，将属性作用到盒子上，使得动画生效*/}
    </CSSTransition>
  )
}

export default Transition