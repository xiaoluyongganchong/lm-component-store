import { useState } from 'react';
import Transition from './tansition';

const meta = {
  title: 'Components/Transition',
  component: Transition,
  tags: ['autodocs'],
};

export default meta;

export const ZoomInTop = {
  render: () => {
    const [show, setShow] = useState(true);
    return (
      <div style={{ padding: 12 }}>
        <button type="button" onClick={() => setShow((v) => !v)}>
          切换显示
        </button>
        <Transition in={show} timeout={250} animation="zoom-in-top" unmountOnExit>
          <div
            style={{
              marginTop: 12,
              width: 220,
              padding: '10px 12px',
              border: '1px solid #d9d9d9',
              borderRadius: 6,
              background: '#fff'
            }}
          >
            顶部缩放动画
          </div>
        </Transition>
      </div>
    );
  },
};

export const ZoomInLeft = {
  render: () => {
    const [show, setShow] = useState(true);
    return (
      <div style={{ padding: 12 }}>
        <button type="button" onClick={() => setShow((v) => !v)}>
          切换显示
        </button>
        <Transition in={show} timeout={250} animation="zoom-in-left" unmountOnExit>
          <div
            style={{
              marginTop: 12,
              width: 220,
              padding: '10px 12px',
              border: '1px solid #d9d9d9',
              borderRadius: 6,
              background: '#fff'
            }}
          >
            左侧缩放动画
          </div>
        </Transition>
      </div>
    );
  },
};
