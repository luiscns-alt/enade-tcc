import { formatDate } from '@/utils/functions';
import { ModalForm } from '@ant-design/pro-form';
import { Divider, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'umi';

type CreateFormProps = {
  initialValues: any;
  formRef: any;
  modalVisible: boolean;
  onFinish: (value: any) => Promise<void>;
  onVisibleChange: (flag: boolean) => void;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { formRef, modalVisible, initialValues } = props;
  const intl = useIntl();

  const answerData = initialValues?.questionsResponse.map((response) => {
    return response.question.answers.find((answer) => answer.id === response.selectedAnswerId);
  });

  return (
    <ModalForm
      title={'Resumo'}
      width="800px"
      formRef={formRef}
      visible={modalVisible}
      initialValues={initialValues}
      onVisibleChange={props.onVisibleChange}
      onFinish={props.onFinish}
      submitter={{
        submitButtonProps: {
          style: {
            display: 'none',
          },
        },
      }}
    >
      <Typography.Title level={5}>ID: {initialValues?.id}</Typography.Title>
      <Typography.Title level={5}>Nome: {initialValues?.user.name}</Typography.Title>
      <Typography.Title level={5}>
        Respondido em: {formatDate(initialValues?.answeredAt)}
      </Typography.Title>
      <Divider />
      <Typography.Title level={5}>
        Título do Questionário: {initialValues?.quiz.title}
      </Typography.Title>
      <Typography.Title level={5}>Descrição: {initialValues?.quiz.description}</Typography.Title>
      <Divider />
      {answerData?.map((answer) => (
        <div key={answer.id}>
          <Typography.Title level={5}>Resposta selecionada: {answer.text}</Typography.Title>
          <Typography.Title level={5}>
            É correta: {answer.isCorrect ? 'Sim' : 'Não'}
          </Typography.Title>
        </div>
      ))}
    </ModalForm>
  );
};

export default CreateForm;
