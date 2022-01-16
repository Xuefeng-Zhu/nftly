import React, { useEffect } from 'react';
import { Button, List, Form, Input, TextArea } from 'antd-mobile';

import { useWeb3Context } from '../contexts/Web3ContextProvider';

const QuickMint = () => {
  const { loadWeb3Modal, address } = useWeb3Context();

  if (!address) {
    return (
      <List mode="card">
        <List.Item onClick={loadWeb3Modal}>Connect Wallet</List.Item>
      </List>
    );
  }

  return (
    <>
      <Form
        footer={
          <Button block type="submit" color="primary" size="large">
            Submit
          </Button>
        }
      >
        <Form.Header>水平布局</Form.Header>
        <Form.Item
          name="姓名"
          label="姓名"
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <Input onChange={console.log} placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item name="address" label="地址">
          <TextArea placeholder="请输入地址" maxLength={100} rows={4} />
        </Form.Item>
      </Form>
    </>
  );
};

export default QuickMint;
