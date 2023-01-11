import { Button, Popconfirm } from 'antd';
import React from 'react';
import { useIntl } from 'umi';

type DeleteConfirmProps = {
  onConfirm: () => Promise<void>;
};

const DeleteConfirm: React.FC<DeleteConfirmProps> = (props) => {
  const intl = useIntl();

  return (
    <Popconfirm
      placement="topLeft"
      title={'Confirmar Exclusão?'}
      onConfirm={props.onConfirm}
      okText={'Sim'}
      cancelText={'Não'}
    >
      <Button type="primary" danger>
        {'Excluir'}
      </Button>
    </Popconfirm>
  );
};

export default DeleteConfirm;
