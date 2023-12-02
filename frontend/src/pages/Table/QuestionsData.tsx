import { clear } from '@/redux/slicer/Quiz';
import { deleteQuestionnaires, getQuestionnaires } from '@/services/ant-design-pro/api';
import { getIds } from '@/utils/functions';
import { EditOutlined, FolderViewOutlined, PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { history, useIntl } from 'umi';
import DeleteConfirm from './DeleteConfirm';

const handleRemove = async (t: any, selectedRows: API.QuizDTO[]) => {
  const hideLoadingMessage = message.loading('error');
  try {
    hideLoadingMessage();
    const ids = getIds(selectedRows, 'id');
    const res = await deleteQuestionnaires(ids);
    if (res.success) {
      message.success(t.formatMessage({ id: 'app.deleted.success' }));
    } else {
      message.error(t.formatMessage({ id: 'app.deleted.fail' }) + ' - ' + res);
      return false;
    }
    return true;
  } catch (error) {
    hideLoadingMessage();
    message.error(t.formatMessage({ id: 'app.deleted.fail' }));
    return false;
  }
};

const QuestionsData: React.FC = () => {
  const t = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const [searchTerm, handleSearchTerm] = useState<string>('');
  const [selectedRowsState, setSelectedRows] = useState<API.QuizDTO[]>([]);
  // const { initialState } = useModel('@@initialState');

  const handleClearStore = async () => {
    dispatch(clear());
  };

  const columns: ProColumns<API.QuizDTO>[] | undefined = [
    {
      title: t.formatMessage({ id: 'component.quiz.id' }),
      dataIndex: 'id',
      // sorter: true,
      // search: false,
      // copyable: true,
      width: '20%',
    },
    {
      title: t.formatMessage({ id: 'component.quiz.title' }),
      dataIndex: 'title',
      sorter: true,
      defaultSortOrder: 'ascend',
      width: '20%',
    },
    {
      title: t.formatMessage({ id: 'component.quiz.description' }),
      dataIndex: 'description',
      sorter: true,
      width: '30%',
    },
    {
      title: t.formatMessage({ id: 'app.generic.enable' }),
      dataIndex: 'published',
      sorter: true,
      search: false,
      width: '10%',
      render: (val) => (val ? 'Sim' : 'Não'),
    },
    {
      title: t.formatMessage({ id: 'app.generic.actions' }),
      dataIndex: 'option',
      valueType: 'option',
      width: '20%',
      render: (_, record) => [
        <Tooltip key="edit" title={t.formatMessage({ id: 'app.generic.edit' })}>
          <Button
            key="action"
            size="large"
            onClick={async () => {
              await handleClearStore();
              history.push({
                pathname: `/questionnaires/${record.id}`,
                search: `?id=${record.id}`,
              });
            }}
          >
            <EditOutlined />
            {t.formatMessage({ id: 'app.generic.edit' })}
          </Button>
        </Tooltip>,
        <Tooltip key="go" title={t.formatMessage({ id: 'app.generic.go' })}>
          <Button
            key="action"
            size="large"
            onClick={async () => {
              await handleClearStore();
              console.log(record);
              history.push({
                pathname: `/answers-questions/${record.id}`,
                search: `?id=${record.id}`,
              });
            }}
          >
            <FolderViewOutlined />
            {t.formatMessage({ id: 'app.generic.go' })}
          </Button>
        </Tooltip>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.QuizDTO, API.TableListPagination>
        actionRef={actionRef}
        rowKey="id"
        pagination={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
        }}
        toolbar={{
          search: {
            onSearch: (value: string) => {
              handleSearchTerm(value);
              actionRef.current?.clearSelected?.();
              actionRef.current?.reloadAndRest?.();
            },
          },
          actions: [
            <Button
              type="primary"
              key="primary"
              onClick={async () => {
                history.push({
                  pathname: '/questionnaires/new',
                });
              }}
            >
              <PlusOutlined />
              {t.formatMessage({ id: 'app.generic.new' })}
            </Button>,
          ],
        }}
        search={false}
        request={async (params, sort, filter) => {
          console.log(params, sort, filter);
          const result = await getQuestionnaires(searchTerm, sort);

          return {
            data: result.data,
            success: result.success,
            total: result.totalItemCount,
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
              </a>
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
    </PageContainer>
  );
};

export default QuestionsData;
