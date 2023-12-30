import { ProFormCheckbox, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-form';
import { Col, Form, Row, Select } from 'antd';
import React from 'react';
import { useIntl } from 'umi';

type UpdateFormProps = {
  initialValues: API.QuestionDTO | undefined;
  formRef: any;
  modalVisible: boolean;
  onFinish: (value: any) => Promise<void>;
  onVisibleChange: (flag: boolean) => void;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { initialValues, formRef, modalVisible } = props;
  const translation = useIntl();

  return (
    <ModalForm
      width={'700px'}
      title={translation.formatMessage({ id: 'app.generic.update.question' })}
      formRef={formRef}
      visible={modalVisible}
      initialValues={initialValues}
      onVisibleChange={props.onVisibleChange}
      onFinish={props.onFinish}
    >
      <ProFormText width="md" name="id" label={'id'} readonly={true} />

      <ProFormTextArea
        name="title"
        label={translation.formatMessage({ id: 'app.generic.title' })}
        placeholder={translation.formatMessage({ id: 'app.generic.inform.title' })}
        rules={[
          {
            required: true,
            message:
              translation.formatMessage({ id: 'app.generic.inform.please' }) +
              translation.formatMessage({ id: 'app.generic.inform.title' }),
          },
        ]}
        fieldProps={{ autoSize: true }}
      />

      <Form.Item
        label={translation.formatMessage({ id: 'component.quiz.type' })}
        name={['type']}
        rules={[{ required: true }]}
        labelCol={{ span: 6 }}
      >
        <Select>
          <Select.Option value="DISCURSIVE" disabled>
            {translation.formatMessage({ id: 'component.quiz.category.DISCURSIVE' })}
          </Select.Option>
          <Select.Option value="OBJECTIVE">
            {translation.formatMessage({ id: 'component.quiz.category.OBJECTIVE' })}
          </Select.Option>
        </Select>
      </Form.Item>

      {/*<ProFormText*/}
      {/*  width="md"*/}
      {/*  name="image"*/}
      {/*  label={translation.formatMessage({ id: 'app.generic.image' })}*/}
      {/*  placeholder={translation.formatMessage({ id: 'app.generic.inform.image' })}*/}
      {/*/>*/}

      <Form.Item
        label={translation.formatMessage({ id: 'app.generic.type' })}
        // name={'answer_'}
        rules={[{ required: true }]}
        labelCol={{ span: 6 }}
      >
        {initialValues?.answers?.map((answer, index) => (
          <Row key={answer.id} justify="space-between" align="middle">
            <Col style={{ width: '38rem' }}>
              <ProFormTextArea
                name={`answer_${index}`}
                initialValue={answer.text}
                fieldProps={{ autoSize: { minRows: 2 } }}
                rules={[
                  {
                    required: true,
                    message:
                      translation.formatMessage({ id: 'app.generic.inform.please' }) +
                      translation.formatMessage({ id: 'app.generic.inform.answer' }),
                  },
                ]}
              />
            </Col>
            <Col>
              <ProFormCheckbox name={`isCorrect_${index}`} initialValue={answer?.isCorrect} />
            </Col>
          </Row>
        ))}
      </Form.Item>
    </ModalForm>
  );
};

export default UpdateForm;
