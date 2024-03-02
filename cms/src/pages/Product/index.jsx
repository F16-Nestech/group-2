import CrudModule from '@/modules/CrudModule/CrudModule';
import ProductForm from '@/forms/ProductForm';

import useLanguage from '@/locale/useLanguage';

export default function Product() {
  const translate = useLanguage();
  const entity = 'products';

  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name,type',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['name'];

  const readColumns = [
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Type'),
      dataIndex: 'type',
    },
    {
      title: translate('Price'),
      dataIndex: 'price',
    },
    {
      title: translate('Image'),
      dataIndex: 'image',
    },
    {
      title: translate('Count In Stock'),
      dataIndex: 'countInStock',
    },
    {
      title: translate('Rating'),
      dataIndex: 'rating',
    },
  ];
  const dataTableColumns = [
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Type'),
      dataIndex: 'type',
    },
    {
      title: translate('Price'),
      dataIndex: 'price',
    },
    {
      title: translate('Image'),
      dataIndex: 'image',
    },
    {
      title: translate('Count In Stock'),
      dataIndex: 'countInStock',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('product'),
    DATATABLE_TITLE: translate('product_list'),
    ADD_NEW_ENTITY: translate('add_new_product'),
    ENTITY_NAME: translate('product'),
    CREATE_ENTITY: translate('save'),
    UPDATE_ENTITY: translate('update'),
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };

  return (
    <CrudModule
      createForm={<ProductForm />}
      updateForm={<ProductForm isUpdateForm={true} />}
      config={config}
    />
  );
}
