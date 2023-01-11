import { ProFormCheckbox } from '@ant-design/pro-components';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Col, Form, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';

type CreateFormProps = {
  formRef: any;
  modalVisible: boolean;
  onFinish: (value) => Promise<void>;
  onVisibleChange: (flag: boolean) => void;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { formRef, modalVisible } = props;
  const intl = useIntl();

  const [option, setOption] = useState(false);

  const checkEmpty = (value: any) => {
    let isCkechValue = false;
    if (value === 'dropdown') {
      isCkechValue = true;
    }
    return isCkechValue;
  };

  return (
    <ModalForm
      title="Nova Questão"
      width="700px"
      formRef={formRef}
      visible={modalVisible}
      onVisibleChange={props.onVisibleChange}
      onFinish={props.onFinish}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: 'Informe o título',
          },
        ]}
        width="xl"
        style={{ width: '100%' }}
        name="question"
        label="Título"
        placeholder="Digite o Título"
      />
      <Form.Item
        label="Tipo"
        name={['type']}
        rules={[{ required: true }]}
        // labelCol={{ span: 6 }}
        // wrapperCol={{ span: 12 }}
      >
        <Select onChange={(e) => setOption(e)}>
          <Select.Option value="string">Discursiva</Select.Option>
          <Select.Option value="dropdown">Múltipla Escolha</Select.Option>
        </Select>
      </Form.Item>
      {checkEmpty(option) ? (
        <>
          <h4>Marque a caixa ao lado se a opção for correta</h4>
          <Row justify="space-between">
            <Col flex="auto">
              <ProFormText
                width="xl"
                name="options_1"
                // label="Opção"
                placeholder="Digite a primeira opção"
              />
            </Col>
            <Col flex="100px" align="middle">
              <ProFormCheckbox name="isCorrect_1" layout="vertical" initialValue={false} />
            </Col>
          </Row>

          <Row justify="space-between">
            <Col flex="auto">
              <ProFormText
                width="xl"
                name="options_2"
                // label="Opção"
                placeholder="Digite a segunda opção"
              />
            </Col>
            <Col flex="100px" align="middle">
              <ProFormCheckbox name="isCorrect_2" layout="vertical" initialValue={false}/>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col flex="auto">
              <ProFormText
                width="xl"
                name="options_3"
                // label="Opção"
                placeholder="Digite a terceira opção"
              />
            </Col>
            <Col flex="100px" align="middle">
              <ProFormCheckbox name="isCorrect_3" layout="vertical" initialValue={false}/>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col flex="auto">
              <ProFormText
                width="xl"
                name="options_4"
                // label="Opção"
                placeholder="Digite a quarta opção"
              />
            </Col>
            <Col flex="100px" align="middle">
              <ProFormCheckbox name="isCorrect_4" layout="vertical" initialValue={false}/>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col flex="auto">
              <ProFormText
                width="xl"
                name="options_5"
                // label="Opção"
                placeholder="Digite a quinta opção"
              />
            </Col>
            <Col flex="100px" align="middle">
              <ProFormCheckbox name="isCorrect_5" layout="vertical" initialValue={false}/>
            </Col>
          </Row>

          <Row justify="space-between">
            <Col flex="auto">
              <ProFormText
                width="xl"
                name="options_6"
                // label="Opção"
                placeholder="Digite a sexta opção"
              />
            </Col>
            <Col flex="100px" align="middle">
              <ProFormCheckbox name="isCorrect_6" layout="vertical" initialValue={false}/>
            </Col>
          </Row>
        </>
      ) : null}
    </ModalForm>
  );
};

export default CreateForm;
