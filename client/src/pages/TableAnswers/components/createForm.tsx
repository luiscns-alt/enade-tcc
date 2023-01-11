import { ModalForm } from '@ant-design/pro-form';
import React from 'react';
import { useIntl } from 'umi';

import type { TestamentDto } from '@/services/api/client/';
import { Divider, Typography } from 'antd';

type CreateFormProps = {
  initialValues: any;
  formRef: any;
  modalVisible: boolean;
  onFinish: (value: TestamentDto) => Promise<void>;
  onVisibleChange: (flag: boolean) => void;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { formRef, modalVisible, initialValues } = props;
  const intl = useIntl();

  console.log(initialValues);

  return (
    <ModalForm
      title={'Respostas'}
      width="400px"
      formRef={formRef}
      visible={modalVisible}
      initialValues={initialValues}
      onVisibleChange={props.onVisibleChange}
      onFinish={props.onFinish}
    >
      <Typography.Title level={4}>Questão: {initialValues?.question}</Typography.Title>
      <Divider />
      <Typography.Title level={4}>Resposta: {initialValues?.answer}</Typography.Title>
      <Divider />
      {initialValues?.isCorrect === true ? (
        <Typography.Title level={4}>Resposta Correta</Typography.Title>
      ) : (
        <Typography.Title level={4}>Resposta Incorreta</Typography.Title>
      )}
    </ModalForm>
  );
};

export default CreateForm;
