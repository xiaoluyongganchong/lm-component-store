import React, { useState } from 'react';

import './App.css';

import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';


function App() {

  return (
    <>
       <Menu defaultIndex={0}>
        <MenuItem>
          1
        </MenuItem>
        <MenuItem>
          2
        </MenuItem>
        <MenuItem>
          3
        </MenuItem>
        <MenuItem>
          4
        </MenuItem>
      </Menu>

       <div className="App">
      <Button btnType={ButtonType.Default} size={ButtonSize.large}>button</Button>
      <Button btnType={ButtonType.Link} size={ButtonSize.small} href='www.baidu.com'>baidu</Button>
      <Alert title='紧张吗' children='有点'></Alert>
      <Alert title='271199' closable></Alert>
      <Alert title='你看球吗' children='不看'></Alert>
      <Alert type={AlertType.Danger}>271199</Alert>
    </div>
    </>
   
  );
}

export default App;
