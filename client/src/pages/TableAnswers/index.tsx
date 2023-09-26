import { PageContainer } from '@ant-design/pro-layout';
import 'antd/dist/antd.css';
import React, { useRef, useState } from 'react';
import { useIntl, useModel } from 'umi';

import type { ProFormInstance } from '@ant-design/pro-form';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { TableListPagination } from './data';

import { getAnswer } from '@/services/ant-design-pro/api';
import { FormattedMessage } from '@@/exports';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/createForm';

const handleRemove = async (intl: any, selectedRows) => {};

const handleAdd = async (intl: any, fields) => {};

const TableAnswers: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState();
  const actionRef = useRef<ActionType>();
  const createFormRef = useRef<ProFormInstance>();
  const [searchTerm, handleSearchTerm] = useState<string>('');
  const [selectedRowsState, setSelectedRows] = useState([]);
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');

  const handleClearStore = async () => {
    console.log('Limpar Store');
  };

  const columns: ProColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      search: false,
      copyable: true,
      width: '25%',
    },
    {
      title: 'Nome',
      dataIndex: 'user',
      sorter: true,
      defaultSortOrder: 'ascend',
      width: '35%',
      render: (user: any) => [<div key={'user'}>{user.name}</div>],
    },
    {
      title: 'Título da Questionário',
      dataIndex: 'quiz',
      sorter: true,
      width: '35%',
      render: (quiz: any) => [<div key={'quiz'}>{quiz.title}</div>],
    },
    {
      title: 'Ações',
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
      <ProTable<API.QuizDataApiResponse, TableListPagination>
        headerTitle={'Lista dos Questionarios Respondidos'}
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
              console.log('SearchBy', value);
              handleSearchTerm(value);
              actionRef.current?.clearSelected?.();
              actionRef.current?.reloadAndRest?.();
            },
          },
        }}
        search={false}
        request={async (params, sort) => {
          const attrName = Object.keys(sort)[0];
          let sortValue = '';
          if (attrName) {
            sortValue = attrName + ' ';
            if (sort[attrName] == 'descend') {
              sortValue += 'desc';
            } else {
              sortValue += 'asc';
            }
          }

          const result = await getAnswer();

          console.log('tableRequest', result);

          return {
            data: result.data,
            success: result.success,
            total: result.total,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {/*{selectedRowsState?.length > 0 && (*/}
      {/*  <FooterToolbar*/}
      {/*    extra={*/}
      {/*      <div>*/}
      {/*        {intl.formatMessage({ id: 'app.generic.selected' })}*/}
      {/*        <a*/}
      {/*          style={{*/}
      {/*            fontWeight: 600,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          {selectedRowsState.length}*/}
      {/*        </a>{' '}*/}
      {/*        {intl.formatMessage({ id: 'app.generic.item' })} &nbsp;&nbsp;*/}
      {/*      </div>*/}
      {/*    }*/}
      {/*  >*/}
      {/*    <DeleteConfirm*/}
      {/*      onConfirm={async () => {*/}
      {/*        await handleRemove(intl, selectedRowsState);*/}
      {/*        setSelectedRows([]);*/}
      {/*        actionRef.current?.reloadAndRest?.();*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </FooterToolbar>*/}
      {/*)}*/}

      <CreateForm
        initialValues={currentRow}
        formRef={createFormRef}
        modalVisible={createModalVisible}
        onVisibleChange={async (v) => {
          handleModalVisible(v);
          createFormRef.current?.resetFields();
        }}
        onFinish={async (value) => {
          const success = await handleAdd(intl, value);
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

export default TableAnswers;
