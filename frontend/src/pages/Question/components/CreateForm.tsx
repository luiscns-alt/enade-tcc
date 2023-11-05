import { ProFormCheckbox, ProFormTextArea } from '@ant-design/pro-components';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Col, Form, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';

type CreateFormProps = {
  formRef: any;
  modalVisible: boolean;
  onFinish: (value: any) => Promise<void>;
  onVisibleChange: (flag: boolean) => void;
};

const CreateForm: React.FC<CreateFormProps> = ({
  formRef,
  modalVisible,
  onFinish,
  onVisibleChange,
}) => {
  const intl = useIntl();
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [checkboxValues, setCheckboxValues] = useState<boolean[]>(Array(6).fill(false));
  const isObjectiveOption = (value: any) => value === 'OBJECTIVE';

  const OptionRow: React.FC<{ index: number }> = ({ index }) => {
    const placeholders = [
      'Digite a primeira opção',
      'Digite a segunda opção',
      'Digite a terceira opção',
      'Digite a quarta opção',
      'Digite a quinta opção',
      'Digite a sexta opção',
    ];

    const handleCheckboxChange = (isChecked: boolean, index: number) => {
      const newCheckboxValues = Array(5).fill(false);
      if (isChecked) {
        newCheckboxValues[index] = true;
      }
      setCheckboxValues(newCheckboxValues);
    };

    return (
      <Row justify="space-between" align="middle">
        <Col style={{ width: '38rem' }}>
          <ProFormText
            name={['options', index, 'text']}
            placeholder={placeholders[index]}
            required
            rules={[
              {
                required: true,
                message: 'Este campo é obrigatório!',
              },
            ]}
          />
        </Col>
        <Col>
          <ProFormCheckbox
            name={['options', index, 'isCorrect']}
            initialValue={false}
            fieldProps={{
              checked: checkboxValues[index],
              onChange: (e) => handleCheckboxChange(e.target.checked, index),
            }}
          />
        </Col>
      </Row>
    );
  };

  return (
    <ModalForm
      title="Nova Questão"
      width="700px"
      formRef={formRef}
      visible={modalVisible}
      onVisibleChange={onVisibleChange}
      onFinish={onFinish}
    >
      <ProFormTextArea
        name="question"
        label="Título"
        placeholder="Digite o Título"
        rules={[
          {
            required: true,
            message: 'Informe o título',
          },
        ]}
      />
      <Form.Item label="Tipo" name={['type']} rules={[{ required: true }]} labelCol={{ span: 6 }}>
        <Select onChange={(e) => setOption(e)}>
          <Select.Option value="DISCURSIVE">Discursiva</Select.Option>
          <Select.Option value="OBJECTIVE">Múltipla Escolha</Select.Option>
        </Select>
      </Form.Item>
      {isObjectiveOption(option) && (
        <>
          <h4>Marque a caixa ao lado se a opção for correta</h4>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <OptionRow key={index} index={index} />
            ))}
        </>
      )}
    </ModalForm>
  );
};

export default CreateForm;
