import { save, selectQuiz } from '@/redux/slicer/Quiz';
import { getCategory } from '@/services/ant-design-pro/api';
import { useIntl } from '@@/exports';
import { ProFormSelect } from '@ant-design/pro-components';
import { Card, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Quiz: React.FC = () => {
  const dispatch = useDispatch();
  const t = useIntl();
  const { quiz } = useSelector(selectQuiz);
  const [category, setCategory] = useState({});

  const changeInput = async ({ target }: any) => {
    const { id, value } = target;
    dispatch(save({ ...quiz, [id]: value, published: true }));
  };

  const handleCategoryChange = async (e: string) => {
    dispatch(save({ ...quiz, categoryId: e, published: true }));
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await getCategory();
        if (result.success && result.data) {
          const categoryEnum = {};
          result.data.forEach((item) => {
            if (item.id) {
              categoryEnum[item.id] = item.name;
            }
          });
          setCategory(categoryEnum);
        }
      } catch (error) {
        message.error(t.formatMessage({ id: 'component.quiz.category.error' }) + ' - ' + error);
      }
    };

    fetchCategory().catch((error) => {
      message
        .error(t.formatMessage({ id: 'component.quiz.category.error' }) + ' - ' + error)
        .then(() => {});
    });
  }, []);

  return (
    <>
      <Card style={{ borderWidth: '1px' }}>
        <Form.Item
          name="title"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
          label={t.formatMessage({ id: 'component.quiz.title' })}
          rules={[
            {
              required: true,
              message: t.formatMessage({ id: 'component.quiz.title.inform' }),
            },
          ]}
        >
          <Input
            maxLength={255}
            placeholder={t.formatMessage({ id: 'component.quiz.title' })}
            onChange={changeInput}
          />
        </Form.Item>
        <Form.Item
          name="description"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
          label={t.formatMessage({ id: 'component.quiz.description' })}
          rules={[
            {
              required: true,
              message: t.formatMessage({ id: 'component.quiz.description.inform' }),
            },
          ]}
        >
          <Input.TextArea
            rows={4}
            maxLength={255}
            placeholder={t.formatMessage({ id: 'component.quiz.description' })}
            onChange={changeInput}
          />
        </Form.Item>
        <ProFormSelect
          name="categoryId"
          label={t.formatMessage({ id: 'component.quiz.category.label' })}
          valueEnum={category}
          placeholder={t.formatMessage({ id: 'component.quiz.category.placeholder' })}
          rules={[
            { required: true, message: t.formatMessage({ id: 'component.quiz.category.inform' }) },
          ]}
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
          fieldProps={{
            onChange: handleCategoryChange,
          }}
        />
      </Card>
    </>
  );
};

export default Quiz;
