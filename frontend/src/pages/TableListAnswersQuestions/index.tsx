import CreateForm from '@/pages/TableAnswers/components/createForm';
import { getQuizAnswer } from '@/services/ant-design-pro/api';
import { FormattedMessage, useIntl, useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { ProFormInstance } from '@ant-design/pro-form';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';

const handleAdd = async (t: any, fields: any) => {
  console.log(t, fields);
  return true;
};

const TableListAnswersQuestions: React.FC = () => {
  const t = useIntl();
  const quizId = useParams();
  const actionRef = useRef<ActionType>();
  const createFormRef = useRef<ProFormInstance>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.QuizData>();

  const columns: ProColumns<API.QuizData>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      search: false,
      copyable: true,
      width: '25%',
    },
    {
      title: t.formatMessage({ id: 'app.generic.answers.columns.surveyName' }),
      dataIndex: 'user',
      sorter: true,
      defaultSortOrder: 'ascend',
      width: '35%',
      render: (user: any) => [<div key={'user'}>{user.name}</div>],
    },
    {
      title: t.formatMessage({ id: 'app.generic.answers.columns.questionnaireTitle' }),
      dataIndex: 'quiz',
      sorter: true,
      width: '35%',
      render: (quiz: any) => [<div key={'quiz'}>{quiz.title}</div>],
    },
    {
      title: t.formatMessage({ id: 'app.generic.actions' }),
      dataIndex: 'option',
      valueType: 'option',
      width: '5%',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="app.generic.view-more" defaultMessage="Ver mais" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.QuizData, API.TableListPagination>
        actionRef={actionRef}
        rowKey="id"
        pagination={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
        }}
        search={false}
        request={async (params, sort, filter) => {
          console.log(params, sort, filter);
          const result = await getQuizAnswer(quizId.id);

          return {
            data: result.data,
            success: result.success,
            total: result?.data?.length,
          };
        }}
        columns={columns}
      />

      <CreateForm
        initialValues={currentRow}
        formRef={createFormRef}
        modalVisible={createModalVisible}
        onVisibleChange={async (v) => {
          handleModalVisible(v);
          createFormRef.current?.resetFields();
        }}
        onFinish={async (value) => {
          const success = await handleAdd(t, value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
    </PageContainer>
  );
};

export default TableListAnswersQuestions;
