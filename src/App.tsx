import React from 'react';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';
import Icon from './components/Icon/icon';


function App() {

  return (
    <>
      <Icon icon={faCoffee} size="10x" theme="danger" />
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
