import { PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import React, { useRef, useState } from 'react';
import { history, useIntl, useModel } from 'umi';

import type { ProFormInstance } from '@ant-design/pro-form';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { TableListPagination } from './data';

import { getAnswer, getByIdAnswer } from '@/services/ant-design-pro/api';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/createForm';

const handleDocument = async (intl: any, testamentId: String) => {};

const handleCertificate = async (intl: any, testamentId: String) => {};

const handleRemove = async (intl: any, selectedRows) => {};

const handleAdd = async (intl: any, fields) => {
  // const hide = message.loading(intl.formatMessage({ id: 'app.waiting' }));
  // try {
  //   const result = await WebApi.Countries.apiV1CountriesCountryIdStatesStateIdCitiesPost(
  //     countryId,
  //     stateId,
  //     fields,
  //   );
  //   console.log('handleAdd', result);
  //   hide();
  //   if (result.status == 200) {
  //     message.success(intl.formatMessage({ id: 'app.created.success' }));
  //   } else {
  //     message.error(intl.formatMessage({ id: 'app.created.fail' }) + ' - ' + result.data.message);
  //     return false;
  //   }
  //   return true;
  // } catch (error) {
  //   console.error(error);
  //   hide();
  //   message.error(intl.formatMessage({ id: 'app.created.fail' }));
  //   return false;
  // }
};

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
      width: '20%',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      sorter: true,
      defaultSortOrder: 'ascend',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
      width: '30%',
    },
    {
      title: 'Ações',
      dataIndex: 'option',
      valueType: 'option',
      width: '20%',
      render: (_, record) => [
        <a
          key="config"
          onClick={async () => {
            const result = await getByIdAnswer(record.id);
            setCurrentRow(result.answers[0]);
            handleModalVisible(true);
          }}
        >
          {'Ir'}
        </a>,
      ],
    },
  ];

  return (
    <PageContainer content={intl.formatMessage({ id: 'app.testament.message' })}>
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

          const result = await getAnswer();

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
              {intl.formatMessage({ id: 'app.generic.selected' })}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              {intl.formatMessage({ id: 'app.generic.item' })} &nbsp;&nbsp;
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
