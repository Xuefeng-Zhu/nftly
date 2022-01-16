import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, List, Form, Input, TextArea, Dialog } from 'antd-mobile';

import { useWeb3Context } from '../contexts/Web3ContextProvider';
import { easyMint, uploadFile } from '../utils/nftport';

const MintToken = () => {
  const history = useHistory();
  const { address } = useWeb3Context();
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [loading, setLoading] = useState(false);

  async function handleDeploy() {
    setLoading(true);
    const data = await easyMint(name, symbol, address);
    setLoading(false);

    Dialog.confirm({
      content: 'Mint transaction has been submitted.',
      confirmText: 'View tx',
      onConfirm: () => {
        window.open(data.transaction_external_url, '_blank');
      },
      cancelText: 'Back',
    });
  }

  return (
    <>
      <Form
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            loading={loading}
            onClick={handleDeploy}
          >
            Submit
          </Button>
        }
      >
        <Form.Header>Deploy NFT Contract</Form.Header>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input onChange={setName} />
        </Form.Item>

        <Form.Item
          name="symbol"
          label="Symbol"
          rules={[{ required: true, message: 'Symbol is required' }]}
        >
          <Input onChange={setSymbol} />
        </Form.Item>
      </Form>
    </>
  );
};

export default MintToken;
