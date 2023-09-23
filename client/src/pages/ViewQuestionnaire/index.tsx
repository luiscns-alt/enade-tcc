import { selectQuiz } from '@/redux/slicer/Quiz';
import { getQuizId } from '@/services/ant-design-pro/api';
import { formatDate } from '@/utils/functions';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Collapse, Descriptions, Divider, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ViewQuestionnaire: React.FC = () => {
  const { quiz } = useSelector(selectQuiz);
  const [result, setResult] = useState<API.QuizDTO | null>(null);
  const fetchQuizById = async () => {
    const { data } = await getQuizId(quiz);
    setResult(data);
  };

  useEffect(() => {
    const load = async () => {
      await fetchQuizById();
    };
    load();
  }, []);

  return (
    <PageContainer>
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        {result && (
          <div>
            <Descriptions>
              <Descriptions.Item>
                <Typography.Title level={2}>{result.title}</Typography.Title>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Descrição" labelStyle={{ fontWeight: 'bold' }}>
                {result.description}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Publicados" labelStyle={{ fontWeight: 'bold' }}>
                <Typography.Text>{result.published ? 'Sim' : 'No'}</Typography.Text>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Criado em" labelStyle={{ fontWeight: 'bold' }}>
                <Typography.Text>{formatDate(result.createdAt)}</Typography.Text>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Atualizado em" labelStyle={{ fontWeight: 'bold' }}>
                <Typography.Text>{formatDate(result.updatedAt)}</Typography.Text>
              </Descriptions.Item>
            </Descriptions>
            <div>
              {result.question &&
                result.question.map((q, index) => (
                  <div key={q.id || index} style={{ marginBottom: '10px' }}>
                    <Divider orientation="left" />
                    <Collapse>
                      <Collapse.Panel header={q.title} key="1">
                        <Descriptions>
                          <Descriptions.Item
                            label="Tipo de Questão"
                            labelStyle={{ fontWeight: 'bold' }}
                          >
                            {q.type}
                          </Descriptions.Item>
                        </Descriptions>
                        {q.answers && q.answers.length > 0 && (
                          <div>
                            {q.answers && q.answers.length > 0 && (
                              <div>
                                {q.answers.map((answer) => (
                                  <Card
                                    key={answer.id}
                                    style={{
                                      width: 'auto',
                                      background: answer.isCorrect
                                        ? 'linear-gradient(90deg, #52c41a 1%, #FFF 0%)'
                                        : '',
                                    }}
                                  >
                                    <Descriptions>
                                      <Descriptions.Item
                                        label="Alternativa"
                                        labelStyle={{ fontWeight: 'bold' }}
                                      >
                                        {answer.text}
                                      </Descriptions.Item>
                                    </Descriptions>
                                  </Card>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </Collapse.Panel>
                    </Collapse>
                  </div>
                ))}
            </div>
          </div>
        )}
      </Content>
    </PageContainer>
  );
};

export default ViewQuestionnaire;
