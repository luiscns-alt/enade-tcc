import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import React, { useRef, useState } from 'react';
import { history, useIntl, useModel } from 'umi';

import { getQuestionnaires } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { TableListPagination } from './data';

import ProTable from '@ant-design/pro-table';
import DeleteConfirm from './DeleteConfirm';

const handleDocument = async (intl: any, testamentId: String) => {};

const handleCertificate = async (intl: any, testamentId: String) => {};

const handleRemove = async (intl: any, selectedRows) => {};

const Table: React.FC = () => {
  const [searchTerm, handleSearchTerm] = useState<string>('');
  const [selectedRowsState, setSelectedRows] = useState([]);
  const actionRef = useRef<ActionType>();
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');

  const handleClearStore = async () => {
    console.log('Limpar Store');
  };

  const columns: ProColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      // sorter: true,
      // search: false,
      // copyable: true,
      width: '20%',
    },
    {
      title: 'Titulo',
      dataIndex: 'title',
      sorter: true,
      defaultSortOrder: 'ascend',
      width: '20%',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      sorter: true,
      width: '30%',
    },
    {
      title: 'Habilitado',
      dataIndex: 'enable',
      sorter: true,
      search: false,
      width: '10%',
      render: (val) => (val ? 'Sim' : 'Não'),
    },
    {
      title: 'Ações',
      dataIndex: 'option',
      valueType: 'option',
      width: '20%',
      render: (_, record) => [
        <Tooltip key="personal-data" title={'Editar'}>
          <Button
            key="action"
            size="large"
            onClick={() => {
              handleClearStore();
              history.push({
                pathname: `/questionnaires/${record.id}`,
                // query: {
                //   id: `${record.id}`,
                // },
              });
            }}
          >
            <EditOutlined />
            Editar
          </Button>
        </Tooltip>,
      ],
    },
  ];

  return (
    <PageContainer
      content={intl.formatMessage({ id: 'Informe os questinarios utilizados pelo sistema.' })}
    >
      <ProTable<TableListPagination>
        headerTitle={'Lista dos Questionarios'}
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
              <PlusOutlined /> Novo
            </Button>,
          ],
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

          const result = await getQuestionnaires();

          console.log('tableRequest', result);

          return {
            data: result.items,
            // success: result.data.isSuccess,
            total: result.meta.totalItems,
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
              {'Selecionado (s)  '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>
              {'Item (s)  '} &nbsp;&nbsp;
            </div>
          }
        >
          <DeleteConfirm
            onConfirm={async () => {
              await handleRemove(intl, selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          />
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default Table;
