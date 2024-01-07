import { Form, Input } from 'antd';
// import { validatePhoneNumber } from '@/utils/helpers';

import useLanguage from '@/locale/useLanguage';

export default function ProductForm() {
  const translate = useLanguage();
  const validateEmptyString = (_, value) => {
    if (value && value.trim() === '') {
      return Promise.reject(new Error('Field cannot be empty'));
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        label={translate('name')}
        name="name"
        rules={[
          {
            required: true,
          },
          {
            validator: validateEmptyString,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('Price')}
        name="price"
        rules={[
          {
            required: true,
          },
          {
            validator: validateEmptyString,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="image"
        label={translate('Image')}
        rules={[
          {
            required: true,
          },
          {
            validator: validateEmptyString,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label={translate('Description')}
        rules={[
          {
            required: true,
          },
          {
            validator: validateEmptyString,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="total"
        label={translate('Total')}
        rules={[
          {
            required: true,
          },
          {
            validator: validateEmptyString,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
