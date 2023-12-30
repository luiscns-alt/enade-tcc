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
  const t = useIntl();
  const [option, setOption] = useState<string>('OBJECTIVE');
  const [checkboxValues, setCheckboxValues] = useState<boolean[]>(Array(6).fill(false));
  const isObjectiveOption = (value: string) => value === 'OBJECTIVE';

  const OptionRow: React.FC<{ index: number }> = ({ index }) => {
    const placeholders = [
      t.formatMessage({ id: 'component.quiz.option.placeholder1' }),
      t.formatMessage({ id: 'component.quiz.option.placeholder2' }),
      t.formatMessage({ id: 'component.quiz.option.placeholder3' }),
      t.formatMessage({ id: 'component.quiz.option.placeholder4' }),
      t.formatMessage({ id: 'component.quiz.option.placeholder5' }),
      t.formatMessage({ id: 'component.quiz.option.placeholder6' }),
    ];

    const handleCheckboxChange = (isChecked: boolean, i: number) => {
      const newCheckboxValues = Array(5).fill(false);
      if (isChecked) {
        newCheckboxValues[i] = true;
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
                message: t.formatMessage({ id: 'component.quiz.field.required' }),
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
      title={t.formatMessage({ id: 'pages.questions.newQuestion' })}
      width="700px"
      formRef={formRef}
      visible={modalVisible}
      onVisibleChange={onVisibleChange}
      onFinish={onFinish}
    >
      <ProFormTextArea
        name="question"
        label={t.formatMessage({ id: 'component.quiz.title' })}
        placeholder={t.formatMessage({ id: 'component.quiz.title.placeholder' })}
        rules={[
          {
            required: true,
            message: t.formatMessage({ id: 'component.quiz.title.inform' }),
          },
        ]}
      />
      <Form.Item
        label={t.formatMessage({ id: 'component.quiz.type' })}
        name={['type']}
        rules={[{ required: true, message: t.formatMessage({ id: 'component.quiz.type.inform' }) }]}
        labelCol={{ span: 6 }}
      >
        <Select onChange={(e) => setOption(e)}>
          <Select.Option value="DISCURSIVE" disabled>
            {t.formatMessage({ id: 'component.quiz.category.DISCURSIVE' })}
          </Select.Option>
          <Select.Option value="OBJECTIVE">
            {t.formatMessage({ id: 'component.quiz.category.OBJECTIVE' })}
          </Select.Option>
        </Select>
      </Form.Item>

      {isObjectiveOption(option) && (
        <>
          <h4>{t.formatMessage({ id: 'component.quiz.box.inform' })}</h4>
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
