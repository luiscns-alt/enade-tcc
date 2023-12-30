import Question from '@/pages/Question';
import Quiz from '@/pages/Quiz';
import ViewQuestionnaire from '@/pages/ViewQuestionnaire';
import { save, selectQuiz } from '@/redux/slicer/Quiz';
import { createQuiz, getQuizId, updateQuiz } from '@/services/ant-design-pro/api';
import { history, useModel, useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, message, Steps } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'umi';

const QuestionnairesData: React.FC = () => {
  const t = useIntl();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const { quiz } = useSelector(selectQuiz);
  const quizId = useParams();
  const { initialState } = useModel('@@initialState');

  async function newQuiz() {
    try {
      const parseQuiz = { ...quiz, userId: initialState?.currentUser?.id };
      const { data } = await createQuiz(parseQuiz);
      dispatch(save({ ...quiz, id: data.id }));
      message.success(t.formatMessage({ id: 'app.created.success' }));
      setCurrent(current + 1);
      return true;
    } catch (error) {
      message.error('Error');
      console.log(error);
      message.error(t.formatMessage({ id: 'app.created.fail' }));
      return false;
    }
  }

  async function editQuiz() {
    try {
      const parseQuiz = { ...quiz, userId: initialState?.currentUser?.id };
      const { data } = await updateQuiz(parseQuiz);
      dispatch(save({ ...data }));
      message.success(t.formatMessage({ id: 'app.update.success' }));
      setCurrent(current + 1);
      return true;
    } catch (error) {
      message.error('Error');
      console.log(error);
      message.error(t.formatMessage({ id: 'app.update.fail' }));
      return false;
    }
  }

  async function fetchQuizId() {
    if (quizId.id) {
      const result = await getQuizId(quizId);
      const quizData = {
        id: result.data?.id,
        title: result.data?.title,
        description: result.data?.description,
        categoryId: result.data?.categoryId,
      };
      dispatch(save({ ...quizData }));

      form.setFieldsValue({
        title: result.data?.title,
        description: result.data?.description,
        categoryId: result.data?.categoryId,
      });
    }
  }

  useEffect(() => {
    const load = async () => {
      await fetchQuizId();
    };
    load();
  }, []);

  const steps = [
    {
      title: t.formatMessage({ id: 'app.generic.step.quiz' }),
      content: <Quiz />,
    },
    {
      title: t.formatMessage({ id: 'app.generic.step.question' }),
      content: <Question />,
    },
    {
      title: t.formatMessage({ id: 'app.generic.step.finish' }),
      content: <ViewQuestionnaire />,
    },
  ];

  const STEPPER_FUNCTION = {
    0: async () => {
      form.validateFields().then(async () => {
        if (quiz.id) {
          await editQuiz();
        } else {
          await newQuiz();
        }
      });
    },
    1: () => {
      setCurrent(current + 1);
    },
  };

  const next = () => {
    // setCurrent(current + 1);
    STEPPER_FUNCTION[current]();
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <PageContainer>
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        <Steps style={{ paddingBottom: '15px' }} current={current}>
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off" form={form}>
          <div className="steps-content">{steps[current].content}</div>
        </Form>

        <div className="steps-action" style={{ paddingTop: '15px' }}>
          {current < steps.length - 1 && (
            <Button htmlType="submit" type="primary" onClick={next}>
              {t.formatMessage({ id: 'app.generic.next' })}
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => history.push('/')}>
              {t.formatMessage({ id: 'app.generic.finish' })}
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              {t.formatMessage({ id: 'app.generic.previous' })}
            </Button>
          )}
        </div>
      </Content>
    </PageContainer>
  );
};

export default QuestionnairesData;
