import CreateForm from '@/pages/Question/components/CreateForm';
import UpdateForm from '@/pages/Question/components/UpdateForm';
import DeleteConfirm from '@/pages/Table/DeleteConfirm';
import { selectQuiz } from '@/redux/slicer/Quiz';
import {
  createOption,
  createQuestion,
  deleteQuestions,
  getQuizId,
  updateOption,
  updateQuestion,
} from '@/services/ant-design-pro/api';
import { getIds, mergeObjects } from '@/utils/functions';
import { useIntl } from '@@/exports';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Card, message, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const handleAdd = async (fields: any, quiz: { id: any }, translation: any) => {
  const hideLoadingMessage = message.loading('error');
  try {
    hideLoadingMessage();
    const questionData = {
      quizId: quiz.id,
      title: fields.question,
      type: fields.type,
      image: null,
    };
    const result = await createQuestion(questionData);
    if (result.success) {
      for (let i = 0; i < fields.options.length; i++) {
        fields.options[i].questionId = result.data.id;
      }
      const res = await createOption(fields.options);
      if (res.success) {
        message.success(translation.formatMessage({ id: 'app.created.success' }));
      } else {
        message.error(
          translation.formatMessage({ id: 'app.updated.fail' }) + ' - ' + res.data.message,
        );
        return false;
      }
    } else {
      message.error(
        translation.formatMessage({ id: 'app.updated.fail' }) + ' - ' + result.data.message,
      );
      return false;
    }
    return true;
  } catch (error) {
    hideLoadingMessage();
    message.error(translation.formatMessage({ id: 'app.created.fail' }));
    return false;
  }
};

const handleUpdate = async (translation: any, fields: any, currentRow?: API.QuestionDTO) => {
  const hideLoadingMessage = message.loading(translation.formatMessage({ id: 'app.waiting' }));
  if (!currentRow) {
    // Handle the case where currentRow is undefined.
    // Perhaps throw an error or return from the function.
    return false;
  }
  const merged = mergeObjects(currentRow, fields);
  try {
    hideLoadingMessage();
    const questionDetails = {
      id: merged.id,
      quizId: merged.quizId,
      title: merged.title,
      type: merged.type,
      image: merged.image,
    };
    const res = await updateQuestion(questionDetails);
    if (res.success) {
      let allUpdatesSuccess = true;
      if (merged && merged.answers) {
        for (let i = 0; i < merged?.answers.length; i++) {
          const option = merged?.answers[i];
          const response = await updateOption(option);
          if (!response.success) {
            allUpdatesSuccess = false;
            message.error(
              translation.formatMessage({ id: 'app.updated.fail' }) + ' - ' + response.message,
            );
            return false;
          }
        }
      }
      if (allUpdatesSuccess) {
        message.success(translation.formatMessage({ id: 'app.update.success' }));
      }
    } else {
      message.error(translation.formatMessage({ id: 'app.updated.fail' }) + ' - ' + res.message);
      return false;
    }
    return true;
  } catch (error) {
    hideLoadingMessage();
    message.error(translation.formatMessage({ id: 'app.update.fail' }));
    return false;
  }
};

const handleRemove = async (t: any, selectedRows: API.QuestionDTO[]) => {
  const hideLoadingMessage = message.loading('error');
  try {
    hideLoadingMessage();
    const ids = getIds(selectedRows, 'id');
    console.log(ids);
    const res = await deleteQuestions(ids);
    if (res.success) {
      message.success(t.formatMessage({ id: 'app.created.success' }));
    } else {
      message.error(t.formatMessage({ id: 'app.updated.fail' }) + ' - ' + res);
      return false;
    }
    return true;
  } catch (error) {
    hideLoadingMessage();
    message.error(t.formatMessage({ id: 'app.created.fail' }));
    return false;
  }
};

const Question: React.FC = () => {
  const t = useIntl();
  const { quiz } = useSelector(selectQuiz);
  // const { initialState } = useModel('@@initialState');
  const actionRef = useRef<ActionType>();
  const createFormRef = useRef<ProFormInstance>();
  const updateFormRef = useRef<ProFormInstance>();
  const [currentRow, setCurrentRow] = useState<API.QuestionDTO>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<API.QuestionDTO[]>([]);
  // const [searchTerm, handleSearchTerm] = useState<string>('');

  const columns: ProColumns<API.QuestionDTO>[] | undefined = [
    {
      title: t.formatMessage({ id: 'component.quiz.id' }),
      dataIndex: 'id',
      // sorter: true,
      // search: false,
      copyable: true,
      width: '20%',
    },
    {
      title: t.formatMessage({ id: 'app.generic.question' }),
      dataIndex: 'title',
      sorter: true,
      defaultSortOrder: 'ascend',
      width: '60%',
    },
    {
      title: t.formatMessage({ id: 'app.generic.actions' }),
      dataIndex: 'option',
      valueType: 'option',
      width: '20%',
      render: (_, record: React.SetStateAction<API.QuestionDTO | undefined>) => [
        <Tooltip key="personal-data" title={t.formatMessage({ id: 'app.generic.edit' })}>
          <Button
            key="edit"
            type="link"
            size="large"
            onClick={() => {
              if (record) {
                setCurrentRow(record);
                handleUpdateModalVisible(true);
              }
            }}
          >
            <EditOutlined />
            {t.formatMessage({ id: 'app.generic.edit' })}
          </Button>
        </Tooltip>,
      ],
    },
  ];

  return (
    <Card style={{ borderWidth: '1px' }}>
      <>
        <ProTable<API.QuestionDTO, API.TableListPagination>
          headerTitle={t.formatMessage({ id: 'pages.questions.listOfQuestions' })}
          actionRef={actionRef}
          rowKey="id"
          pagination={{
            pageSize: 10,
            pageSizeOptions: [10, 20, 50, 100],
            showSizeChanger: true,
          }}
          toolbar={{
            // search: {
            //   onSearch: (value: string) => {
            //     console.log('SearchBy', value);
            //     handleSearchTerm(value);
            //     actionRef.current?.clearSelected?.();
            //     actionRef.current?.reloadAndRest?.();
            //   },
            // },
            actions: [
              <Button
                type="primary"
                key="primary"
                onClick={async () => {
                  createFormRef.current?.resetFields();
                  handleModalVisible(true);
                }}
              >
                <PlusOutlined /> {t.formatMessage({ id: 'pages.questions.newQuestion' })}
              </Button>,
            ],
          }}
          search={false}
          request={async (params, sort, filter) => {
            console.log(params, sort, filter);
            const result = await getQuizId(quiz);

            return {
              data: result.data?.question,
              success: result.success,
              total: result.data?.question?.length,
            };
          }}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
        {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                {t.formatMessage({ id: 'app.generic.selected' })}
                <a
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {selectedRowsState.length}
                </a>{' '}
                {t.formatMessage({ id: 'app.generic.item' })} &nbsp;&nbsp;
              </div>
            }
          >
            <DeleteConfirm
              onConfirm={async () => {
                await handleRemove(t, selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            />
          </FooterToolbar>
        )}
      </>

      <CreateForm
        formRef={createFormRef}
        modalVisible={createModalVisible}
        onVisibleChange={async (v) => {
          handleModalVisible(v);
          createFormRef.current?.resetFields();
        }}
        onFinish={async (value) => {
          const success = await handleAdd(value, quiz, t);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />

      <UpdateForm
        initialValues={currentRow}
        formRef={updateFormRef}
        modalVisible={updateModalVisible}
        onVisibleChange={async (v) => {
          handleUpdateModalVisible(v);
          updateFormRef.current?.resetFields();
        }}
        onFinish={async (value) => {
          const success = await handleUpdate(t, value as any, currentRow);
          if (success) {
            handleUpdateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
    </Card>
  );
};

export default Question;
