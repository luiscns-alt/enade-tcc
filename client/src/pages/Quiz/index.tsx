import { save, selectQuiz } from '@/redux/slicer/Quiz';
import { Card, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const { quiz } = useSelector(selectQuiz);

  const changeInput = async ({ target }: any) => {
    const { id, value } = target;
    await dispatch(save({ ...quiz, [id]: value }));
  };

  return (
    <>
      <Card style={{ borderWidth: '1px' }}>
        {/* <Typography.Title level={4}>Questão</Typography.Title> */}

        <Form.Item
          name="title"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
          label="Título"
          rules={[
            {
              required: true,
              message: 'Informe um título',
            },
          ]}
        >
          <Input maxLength={255} placeholder="Titulo" onChange={changeInput} />
        </Form.Item>
        <Form.Item
          name="description"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
          label="Descrição"
          rules={[
            {
              required: true,
              message: 'Informe uma descrição',
            },
          ]}
        >
          <Input maxLength={255} placeholder="descrição" onChange={changeInput} />
        </Form.Item>
      </Card>
    </>
  );
};

export default Quiz;
