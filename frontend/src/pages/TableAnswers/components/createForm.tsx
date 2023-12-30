import { formatDate } from '@/utils/functions';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { ProCard, ProDescriptions, StatisticCard } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';
import { Badge, Button, Divider, Statistic, Steps } from 'antd';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

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
  // const t = useIntl();
  // const { token } = theme.useToken();
  const { formRef, modalVisible, initialValues } = props;
  const [current, setCurrent] = useState(0);

  const combinedData = initialValues?.questionsResponse.map((q) => {
    const answer = q.question?.answers?.find((a) => a.id === q.selectedAnswerId);
    const question = q.question;
    const isCorrect = q.question?.answers?.filter((e) => e.isCorrect);

    return { answer, question, isCorrect };
  });
  const CircleIndicator = ({ value }) => {
    return (
      <Badge title={'sds'} status={value ? 'success' : 'error'} text={value ? 'Certo' : 'Errado'}>
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
              <ProDescriptions.Item label="Resposta Selecionada pelo Usuário" valueType="text">
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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
    datasets: [
      {
        label: 'Vendas Mensais',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

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
      <ProCard title="Informações do Questionário" bordered>
        <ProDescriptions column={1}>
          <StatisticCard.Group direction={'row'}>
            <StatisticCard
              statistic={{
                title: '免费流量',
                value: 1806062,
                description: <Statistic title="占比" value="98.5%" />,
              }}
              chart={<Bar data={data} options={options} />}
              chartPlacement="left"
            />
          </StatisticCard.Group>
        </ProDescriptions>
      </ProCard>

      <Divider>Total de Respostas: {`${combinedData?.length}`}</Divider>

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
            Anterior
          </Button>
          <Button
            type="primary"
            onClick={() => next()}
            disabled={!(steps && current < steps.length - 1)}
          >
            Próximo
          </Button>
        </div>
      </>
    </ModalForm>
  );
};

export default CreateForm;
