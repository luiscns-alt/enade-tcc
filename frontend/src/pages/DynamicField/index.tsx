import { save, selectQuestion } from '@/redux/slicer/Question';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DynamicField(props) {
  const dispatch = useDispatch();
  const { question } = useSelector(selectQuestion);

  const changeInput = async ({ target }: any) => {
    const { id, value } = target;
    await dispatch(save({ ...question, [id]: value }));
  };
  const [option, setOption] = useState(false);

  const checkEmpty = (value: any) => {
    let isCkechValue = false;
    if (value === 'dropdown') {
      isCkechValue = true;
    }
    return isCkechValue;
  };
  const onChange = (e) => {
    checkEmpty(e);
  };

  return (
    <Form.List name="fields">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider>Questão {index + 1}</Divider>
                <Form.Item
                  name={[index, 'question']}
                  label="Questão"
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Input placeholder="Informe a questão" onChange={changeInput} />
                </Form.Item>
                <Form.Item
                  label="Tipo"
                  name={[index, 'type']}
                  rules={[{ required: true }]}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Select onChange={(e) => setOption(e)}>
                    <Select.Option value="string">Discursiva</Select.Option>
                    <Select.Option value="dropdown">Múltipla Escolha</Select.Option>
                  </Select>
                </Form.Item>
                {/* {checkEmpty(option) ? (
                  <> */}
                <Form.Item
                  name={'options2'}
                  label="Options"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Input placeholder="option 1, option 2, option 3" onChange={changeInput} />
                  <Checkbox onChange={changeInput}>Marque se a opção for correta</Checkbox>
                </Form.Item>
                <Form.Item
                  name={[index, 'options']}
                  label="Options"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Input placeholder="option 1, option 2, option 3" onChange={changeInput} />
                  <Checkbox onChange={changeInput}>Marque se a opção for correta</Checkbox>
                </Form.Item>
                <Form.Item
                  name={[index, 'options']}
                  label="Options"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Input placeholder="option 1, option 2, option 3" onChange={changeInput} />
                  <Checkbox onChange={changeInput}>Marque se a opção for correta</Checkbox>
                </Form.Item>
                <Form.Item
                  name={[index, 'options']}
                  label="Options"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Input placeholder="option 1, option 2, option 3" onChange={changeInput} />
                  <Checkbox onChange={changeInput}>Marque se a opção for correta</Checkbox>
                </Form.Item>
                <Form.Item
                  name={[index, 'options']}
                  label="Options"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Input placeholder="option 1, option 2, option 3" onChange={changeInput} />
                  <Checkbox onChange={changeInput}>Marque se a opção for correta</Checkbox>
                </Form.Item>
                <Form.Item
                  name={[index, 'options']}
                  label="Options"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Input placeholder="option 1, option 2, option 3" />
                  <Checkbox onChange={changeInput}>Marque se a opção for correta</Checkbox>
                </Form.Item>
                {/* </>
                ) : null} */}
                {fields.length > 1 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Remove Questão
                  </Button>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button type="dashed" onClick={() => add()} style={{ width: '60%' }}>
                <PlusOutlined /> Add Novo
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}

export default DynamicField;
