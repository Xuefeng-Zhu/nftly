import React, { useState } from 'react';
import { CapsuleTabs } from 'antd-mobile';

import Collections from './Collections';
import Sales from './Sales';

const Discovery = () => {
  return (
    <CapsuleTabs defaultActiveKey="collections">
      <CapsuleTabs.Tab title="Collections" key="collections">
        <Collections />
      </CapsuleTabs.Tab>
      <CapsuleTabs.Tab title="Sales" key="sales">
        <Sales />
      </CapsuleTabs.Tab>
    </CapsuleTabs>
  );
};

export default Discovery;
