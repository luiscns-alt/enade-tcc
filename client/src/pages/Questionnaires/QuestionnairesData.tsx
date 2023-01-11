import {save, selectQuiz} from '@/redux/slicer/Quiz';
import {createQuiz, updateQuiz} from '@/services/ant-design-pro/api';
import {PageContainer} from '@ant-design/pro-components';
import {Button, Form, message, Steps} from 'antd';
import {Content} from 'antd/lib/layout/layout';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Question from '../Question';
import Quiz from '../Quiz';
import {useIntl} from "umi";

const steps = [
  {
    title: 'Informações sobre o Questionário ',
    content: <Quiz/>,
  },
  {
    title: 'Título da Questão',
    content: <Question/>,
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

const QuestionnairesData: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const {quiz} = useSelector(selectQuiz);

  async function newQuiz() {
    try {
      const msg = await createQuiz(quiz);
      // Salva msg
      await dispatch(save({...quiz, id: msg.id}));
      message.success(intl.formatMessage({id: 'app.created.success'}));
      setCurrent(current + 1);
      return true;
    } catch (error) {
      message.error('Error');
      console.log(error);
      message.error(intl.formatMessage({id: 'app.created.fail'}));
      return false;
    }
  }

  async function editQuiz() {
    try {
      const res = await updateQuiz(quiz);
      await dispatch(save({...quiz, id: res.id}));
      message.success(intl.formatMessage({id: 'app.update.success'}));
      setCurrent(current + 1);
      return true;
    } catch (error) {
      message.error('Error');
      console.log(error);
      message.error(intl.formatMessage({id: 'app.created.fail'}));
      return false;
    }
  }

  const STPPER_FUNCTION = {
    0: () => {
      if (typeof quiz.id != 'undefined') {
        editQuiz()
      } else {
        newQuiz();
      }
    },
    1: () => {
      setCurrent(current + 1);
    },
  };

  const next = () => {
    // setCurrent(current + 1);
    STPPER_FUNCTION[current]();
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <PageContainer content="Cadastra Questionários">
      <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
        <Steps style={{paddingBottom: '15px'}} current={current}>
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title}/>
          ))}
        </Steps>

        <Form labelCol={{span: 8}} wrapperCol={{span: 16}} autoComplete="off" form={form}>
          <div className="steps-content">{steps[current].content}</div>
        </Form>

        <div className="steps-action" style={{paddingTop: '15px'}}>
          {current < steps.length - 1 && (
            <Button htmlType="submit" type="primary" onClick={next}>
              Próximo
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => alert('Processing complete!')}>
              Concluir
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              anterior
            </Button>
          )}
        </div>
      </Content>
    </PageContainer>
  );
};

export default QuestionnairesData;
