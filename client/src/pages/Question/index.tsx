import {selectQuiz} from '@/redux/slicer/Quiz';
import {createOption, createQuestion, getQuestionnaires, getQuizId} from '@/services/ant-design-pro/api';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import type {ProFormInstance} from '@ant-design/pro-form';
import type {ActionType} from '@ant-design/pro-table';
import {Button, Card, Divider, message, Tooltip} from 'antd';
import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import DynamicField from '../DynamicField';
import CreateForm from './components/CreateForm';
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {history} from "@@/core/history";
import {FooterToolbar} from "@ant-design/pro-layout";
import {useIntl, useModel} from "@@/exports";
import { TableListPagination } from './data';

const defaultFormItemLayout = {
  labelCol: {
    xs: {span: 6},
  },
  wrapperCol: {
    xs: {span: 12},
  },
};
const handleAdd = async (fields: any, quiz) => {
  console.log(fields);
  const hide = message.loading('error');
  const data = {
    question: fields.question,
    quizId: quiz.id,
  };
  try {
    hide();
    const result = await createQuestion(data);
    console.log('handleUpdate', result);
    const opt1 = {
      questionId: result.id,
      text: fields.options_1,
      isCorrect: fields.isCorrect_1,
    };
    const resultopt1 = await createOption(opt1);
    console.log('🚀 ~ file: index.tsx ~ line 36 ~ handleAdd ~ resultopt1', resultopt1);
    const opt2 = {
      questionId: result.id,
      text: fields.options_2,
      isCorrect: fields.isCorrect_2,
    };
    const resultopt2 = await createOption(opt2);

    const opt3 = {
      questionId: result.id,
      text: fields.options_3,
      isCorrect: fields.isCorrect_3,
    };
    const resultopt3 = await createOption(opt3);

    const opt4 = {
      questionId: result.id,
      text: fields.options_4,
      isCorrect: fields.isCorrect_4,
    };
    const resultopt4 = await createOption(opt4);

    const opt5 = {
      questionId: result.id,
      text: fields.options_5,
      isCorrect: fields.isCorrect_5,
    };
    const resultopt5 = await createOption(opt5);

    const opt6 = {
      questionId: result.id,
      text: fields.options_6,
      isCorrect: fields.isCorrect_6,
    };
    const resultopt6 = await createOption(opt6);

    message.success('Sucesso');
    // if (result.status == 200) {
    //   const res =
    //     await WebApi.TestamentsApi.apiV1TestamentsTestamentIdPersonsPersonIdAddressesAddressIdPut(
    //       testamentIdUrl as string,
    //       id,
    //       addressId as string,
    //       addressHeirs,
    //     );
    //   if (res.status == 200) {
    //     message.success(intl.formatMessage({ id: 'app.updated.success' }));
    //   } else {
    //     message.error(intl.formatMessage({ id: 'app.updated.fail' }) + ' - ' + res.data.message);
    //     return false;
    //   }
    // } else {
    //   message.error(intl.formatMessage({ id: 'app.updated.fail' }) + ' - ' + result.data.message);
    //   return false;
    // }
    return true;
  } catch (error) {
    hide();
    message.error('Falha');
    return false;
  }
};

const Question: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const createFormRef = useRef<ProFormInstance>();
  const {quiz} = useSelector(selectQuiz);
  const [searchTerm, handleSearchTerm] = useState<string>('');
  const [selectedRowsState, setSelectedRows] = useState([]);
  const {initialState} = useModel('@@initialState');

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
      title: 'Questão',
      dataIndex: 'question',
      sorter: true,
      defaultSortOrder: 'ascend',
      width: '60%',
    },
    {
      title: 'Ações',
      dataIndex: 'option',
      valueType: 'option',
      width: '20%',
      render: (_, record) => [
        <Tooltip
          key="personal-data"
          title={'Editar'}
        >
          <Button key="downloadTestament" type="link" size="large" onClick={() => {}}>
            <EditOutlined />
            Editar
          </Button>
        </Tooltip>,
      ],
    },
  ];

  return (
    <Card style={{borderWidth: '1px'}}>
      {/* <Typography.Title level={4}>Questão</Typography.Title> */}
      <Button
        type="primary"
        key="primary"
        onClick={() => {
          createFormRef.current?.resetFields();
          handleModalVisible(true);
        }}
      >
        <PlusOutlined/> Nova Questão
      </Button>
      {/*<Divider dashed>Adicionar Querstões</Divider>*/}
      {/*<DynamicField {...defaultFormItemLayout} />*/}

      <>
        <ProTable<TableListPagination>
          headerTitle={'Lista de Questões'}
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
                <PlusOutlined/> Novo
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

            const result = await getQuizId(quiz);

            console.log('tableRequest', result);

            return {
              data: result.questions,
              // success: result.data.isSuccess,
              // total: result.meta.totalItems,
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
                {intl.formatMessage({id: 'app.generic.selected'})}
                <a
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {selectedRowsState.length}
                </a>{' '}
                {intl.formatMessage({id: 'app.generic.item'})} &nbsp;&nbsp;
              </div>
            }
          >
            {/*<DeleteConfirm*/}
            {/*  onConfirm={async () => {*/}
            {/*    await handleRemove(intl, selectedRowsState);*/}
            {/*    setSelectedRows([]);*/}
            {/*    actionRef.current?.reloadAndRest?.();*/}
            {/*  }}*/}
            {/*/>*/}
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
          const success = await handleAdd(value, quiz);
          if (success) {
            handleModalVisible(false);
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
