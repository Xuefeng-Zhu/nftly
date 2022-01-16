import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  List,
  Form,
  Input,
  TextArea,
  ImageUploader,
  Dialog,
} from 'antd-mobile';

import { useWeb3Context } from '../contexts/Web3ContextProvider';
import { easyMint, uploadFile } from '../utils/nftport';

const MintToken = () => {
  const history = useHistory();
  const { address } = useWeb3Context();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  async function handleMint() {
    setLoading(true);
    const data = await easyMint(name, description, address, file[0].url);
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
            onClick={handleMint}
          >
            Submit
          </Button>
        }
      >
        <Form.Header>Mint</Form.Header>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input onChange={setName} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Description is required' }]}
        >
          <TextArea rows={3} onChange={setDescription} />
        </Form.Item>
        <Form.Item
          name="file"
          label="File"
          rules={[{ required: true, message: 'File is required' }]}
        >
          <ImageUploader
            value={file}
            onChange={setFile}
            upload={uploadFile}
            maxCount={1}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default MintToken;
