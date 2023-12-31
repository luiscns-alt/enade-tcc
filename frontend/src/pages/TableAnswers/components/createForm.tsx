import { formatDate } from '@/utils/functions';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { ProCard, ProDescriptions, StatisticCard } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';
import { Badge, Button, Divider, Steps } from 'antd';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useIntl } from 'umi';

type CreateFormProps = {
  initialValues: API.QuizData | undefined;
  formRef:
    | React.MutableRefObject<ProFormInstance | undefined>
    | React.RefObject<ProFormInstance | undefined>
    | undefined;
  modalVisible: boolean;
  onFinish: (value: any) => Promise<void>;
  onVisibleChange: (flag: boolean) => void;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const t = useIntl();
  ChartJS.register(ArcElement, Tooltip, Legend);

  const { formRef, modalVisible, initialValues } = props;
  const [current, setCurrent] = useState(0);

  const combinedData = initialValues?.questionsResponse.map((q) => {
    const answer = q.question?.answers?.find((a) => a.id === q.selectedAnswerId);
    const question = q.question;
    const isCorrect = q.question?.answers?.filter((e) => e.isCorrect);

    return { answer, question, isCorrect };
  });

  const generateResultArray = (
    quizData:
      | {
          answer: any;
          question: API.QuestionDTO | undefined;
          isCorrect: any;
        }[]
      | undefined,
  ) => {
    return quizData?.map((item) => {
      const userAnswer = item.answer;
      const isCorrectAnswer = item.isCorrect.some(
        (correct: { id: any }) => correct.id === userAnswer.id,
      );
      return {
        questionId: item?.question?.id,
        userAnswer: userAnswer.text,
        isCorrect: isCorrectAnswer,
      };
    });
  };

  const resultArray = generateResultArray(combinedData);

  const CircleIndicator = ({ value }: any) => {
    return (
      <Badge
        title={'sds'}
        status={value ? 'success' : 'error'}
        text={
          value
            ? t.formatMessage({ id: 'app.generic.answers.right' })
            : t.formatMessage({ id: 'app.generic.answers.wrong' })
        }
      >
        {value ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone twoToneColor="#f5222d" />
        )}
      </Badge>
    );
  };

  const steps = combinedData?.map((data, index) => {
    return {
      title: `Step ${index + 1}`,
      content: (
        <>
          <ProCard
            title={`${index + 1} - ${data.question?.title}`}
            key={data.question?.id}
            bordered
          >
            <ProDescriptions column={1} key={data.question?.id}>
              {data.question?.answers?.map((a) => (
                <>
                  <ProDescriptions.Item
                    key={a.id}
                    valueType="text"
                    style={{
                      marginLeft: '1rem',
                    }}
                  >
                    {a.isCorrect && <CircleIndicator value={a.isCorrect} />}
                    {data?.answer?.id === a.id && (
                      <CircleIndicator value={data.answer?.isCorrect} />
                    )}
                    <span style={{ marginLeft: '1rem', marginRight: '3rem' }}>{a.text}</span>
                    <br />
                  </ProDescriptions.Item>
                </>
              ))}
              <Divider />
              <ProDescriptions.Item
                label={t.formatMessage({ id: 'app.generic.answers.selectedResponse' })}
                valueType="text"
              >
                {' '}
              </ProDescriptions.Item>
              <ProDescriptions.Item valueType="text">{data.answer?.text}</ProDescriptions.Item>
            </ProDescriptions>
          </ProCard>
        </>
      ),
    };
  });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' && current > 0) {
      prev();
    } else if (event.key === 'ArrowRight' && steps && current < steps.length - 1) {
      next();
    }
  };

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [current, steps]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t.formatMessage({ id: 'app.generic.answers.questionnaire' }),
      },
    },
  };

  const correctAnswersCount =
    resultArray && resultArray.filter((result) => result.isCorrect).length;
  const incorrectAnswersCount = correctAnswersCount && resultArray.length - correctAnswersCount;

  const data = {
    labels: [
      t.formatMessage({ id: 'app.generic.answers.correct' }),
      t.formatMessage({ id: 'app.generic.answers.incorrect' }),
    ],
    datasets: [
      {
        label: t.formatMessage({ id: 'app.generic.answers.surveyResults' }),
        data: [correctAnswersCount, incorrectAnswersCount],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ModalForm
      title={t.formatMessage({ id: 'app.generic.answers.resume' })}
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
      <ProCard title={t.formatMessage({ id: 'app.generic.answers.userInfo' })} bordered>
        <ProDescriptions column={1}>
          <ProDescriptions.Item
            label={t.formatMessage({ id: 'app.generic.answers.id' })}
            valueType="text"
          >
            {initialValues?.id}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={t.formatMessage({ id: 'app.generic.answers.name' })}
            valueType="text"
          >
            {initialValues?.user.name} {initialValues?.user.surname}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={t.formatMessage({ id: 'app.generic.answers.user' })}
            valueType="text"
          >
            {initialValues?.user.login}
          </ProDescriptions.Item>
        </ProDescriptions>
      </ProCard>

      <ProCard title={t.formatMessage({ id: 'app.generic.answers.surveyInfo' })} bordered>
        <ProDescriptions column={1}>
          <ProDescriptions.Item
            label={t.formatMessage({ id: 'app.generic.answers.title' })}
            valueType="text"
          >
            {initialValues?.quiz.title}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={t.formatMessage({ id: 'app.generic.answers.description' })}
            valueType="text"
          >
            {initialValues?.quiz.description}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={t.formatMessage({ id: 'app.generic.answers.createdAt' })}
            valueType="text"
          >
            {initialValues?.quiz?.createdAt && formatDate(initialValues.quiz.createdAt)}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={t.formatMessage({ id: 'app.generic.answers.updatedAt' })}
            valueType="text"
          >
            {initialValues?.quiz?.updatedAt && formatDate(initialValues.quiz.updatedAt)}
          </ProDescriptions.Item>
        </ProDescriptions>
      </ProCard>

      <ProCard title={t.formatMessage({ id: 'app.generic.answers.graphic' })} bordered>
        <ProDescriptions column={1}>
          <StatisticCard.Group direction={'row'}>
            <StatisticCard
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              chart={
                <Pie data={data} options={options} style={{ width: '20rem', height: '20rem' }} />
              }
            />
          </StatisticCard.Group>
        </ProDescriptions>
      </ProCard>

      <Divider>
        {t.formatMessage({ id: 'app.generic.answers.totalResponses' })} {`${combinedData?.length}`}
      </Divider>

      <>
        <Steps current={current} />
        <div>
          {combinedData &&
            steps &&
            current < combinedData.length &&
            steps[current] &&
            steps[current].content}
        </div>
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button style={{ margin: '0 8px' }} onClick={() => prev()} disabled={current <= 0}>
            {t.formatMessage({ id: 'app.generic.answers.previous' })}
          </Button>
          <Button
            type="primary"
            onClick={() => next()}
            disabled={!(steps && current < steps.length - 1)}
          >
            {t.formatMessage({ id: 'app.generic.answers.next' })}
          </Button>
        </div>
      </>
    </ModalForm>
  );
};

export default CreateForm;
