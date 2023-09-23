import { getCategory } from '@/services/ant-design-pro/api';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

interface CategorySelectProps {
  onChange?: (e: any) => Promise<void>;
  defaultValue?: string;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ onChange, defaultValue }) => {
  const [data, setData] = useState<CategoryItem[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCategory();
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Select
      loading={loading}
      placeholder="Selecione uma opção"
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {data?.map((item) => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};

export default CategorySelect;
