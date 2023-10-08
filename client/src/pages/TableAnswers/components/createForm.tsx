import { formatDate } from '@/utils/functions';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';
import { Divider } from 'antd';
import React from 'react';
import { useIntl } from 'umi';

type CreateFormProps = {
  initialValues: API.QuizData | undefined;
  formRef:
    | React.MutableRefObject<ProFormInstance<any> | undefined>
    | React.RefObject<ProFormInstance<any> | undefined>
    | undefined;
  modalVisible: boolean;
  onFinish: (value: any) => Promise<void>;
  onVisibleChange: (flag: boolean) => void;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { formRef, modalVisible, initialValues } = props;
  const t = useIntl();
  const combinedData = initialValues?.questionsResponse.map((q) => {
    const answer = q.question?.answers?.find((a) => a.id === q.selectedAnswerId);
    const question = q.question;
    const isCorrect = q.question?.answers?.filter((e) => e.isCorrect);

    return { answer, question, isCorrect };
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
      <ProCard title="Informações do Usuario" bordered>
        <ProDescriptions column={1}>
          <ProDescriptions.Item label="ID" valueType="text">
            {initialValues?.id}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Nome" valueType="text">
            {initialValues?.user.name} {initialValues?.user.surname}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="User" valueType="text">
            {initialValues?.user.login}
          </ProDescriptions.Item>
        </ProDescriptions>
      </ProCard>
      <ProCard title="Informações do Questionário" bordered>
        <ProDescriptions column={1}>
          <ProDescriptions.Item label="Título" valueType="text">
            {initialValues?.quiz.title}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Descrição" valueType="text">
            {initialValues?.quiz.description}
          </ProDescriptions.Item>
          {/*<ProDescriptions.Item label="Categoria ID" valueType="text">*/}
          {/*  {initialValues?.quiz.description}*/}
          {/*</ProDescriptions.Item>*/}
          <ProDescriptions.Item label="Criado em" valueType="text">
            {initialValues?.quiz?.createdAt && formatDate(initialValues.quiz.createdAt)}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Atualizado em" valueType="text">
            {initialValues?.quiz?.updatedAt && formatDate(initialValues.quiz.updatedAt)}
          </ProDescriptions.Item>
        </ProDescriptions>
      </ProCard>

      <Divider>Respostas</Divider>

      {combinedData?.map((r, index) => (
        <ProCard title={`${index + 1} - ${r.question?.title}`} key={r.question?.id} bordered>
          <ProDescriptions column={1} key={r.question?.id}>
            <ProDescriptions.Item label="Opções" valueType="text">
              {' '}
            </ProDescriptions.Item>
            {r.question?.answers?.map((a) => (
              <ProDescriptions.Item
                key={a.id}
                valueType="text"
                valueEnum={{
                  false: { text: 'Não', status: 'Error' },
                  true: { text: 'Sim', status: 'success' },
                }}
              >
                {a.text}
              </ProDescriptions.Item>
            ))}
            <Divider />
            <ProDescriptions.Item label="Resposta Correta" valueType="text">
              {' '}
            </ProDescriptions.Item>
            {r?.isCorrect?.map((i) => (
              <ProDescriptions.Item key={i.id} valueType="text">
                {i.text}
              </ProDescriptions.Item>
            ))}
            <ProDescriptions.Item label="Resposta Selecionada pelo Usuário" valueType="text">
              {' '}
            </ProDescriptions.Item>
            <ProDescriptions.Item valueType="text">{r.answer?.text}</ProDescriptions.Item>
            {/*<ProDescriptions.Item*/}
            {/*  label="Está correto"*/}
            {/*  valueEnum={{*/}
            {/*    false: { text: 'Não', status: 'Error' },*/}
            {/*    true: { text: 'Sim', status: 'success' },*/}
            {/*  }}*/}
            {/*>*/}
            {/*  {r.answer?.isCorrect ? 'true' : 'false'}*/}
            {/*</ProDescriptions.Item>*/}
          </ProDescriptions>
        </ProCard>
      ))}
    </ModalForm>
  );
};

export default CreateForm;
