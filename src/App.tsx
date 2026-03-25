import React, { useState } from 'react';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/tansition';
import Alert, { AlertType } from './components/Alert/alert';


function App() {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      <Icon icon={faCoffee} size="10x" theme="danger" />
      <button onClick={() => setShowPanel((prev) => !prev)}>
        切换 Transition 动画
      </button>
      <Transition in={showPanel} timeout={200} animation="zoom-in-top" unmountOnExit>
        <div style={{ padding: '12px 0' }}>这是一段带过渡动画的内容</div>
      </Transition>
      <Alert title="提示" type={AlertType.Success}>
        这是一个可关闭并带关闭动画的 Alert
      </Alert>
      <Tabs defaultIndex="0" type="card">
        <TabsItem label="橹穆">
          271199
        </TabsItem>
        <TabsItem label="杰丞">
          法法法
        </TabsItem>
        <TabsItem label="豚馒">
          两个可爱萌物
        </TabsItem>
      </Tabs>
      <Tabs defaultIndex="1" type="line">
        <TabsItem label="橹穆">
          271199
        </TabsItem>
        <TabsItem label="杰丞">
          法法法
        </TabsItem>
        <TabsItem label="豚馒">
          两个可爱萌物
        </TabsItem>
      </Tabs>
    </>
  );
}

export default App;
