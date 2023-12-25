import CrudModule from '@/modules/CrudModule/CrudModule';
import ProductForm from '@/forms/ProductForm';

import useLanguage from '@/locale/useLanguage';

export default function Product() {
  const translate = useLanguage();
  const entity = 'client';

  const searchConfig = {
    displayLabels: ['company'],
    searchFields: 'company,managerSurname,managerName',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['company'];

  const readColumns = [
    {
      title: translate('Company'),
      dataIndex: 'company',
    },
    {
      title: translate('Manager first name'),
      dataIndex: 'managerName',
    },
    {
      title: translate('Manager last name'),
      dataIndex: 'managerSurname',
    },
    {
      title: translate('Email'),
      dataIndex: 'email',
    },
    {
      title: translate('Phone'),
      dataIndex: 'phone',
    },
  ];
  const dataTableColumns = [
    {
      title: translate('Company'),
      dataIndex: 'company',
    },
    {
      title: translate('Manager first name'),
      dataIndex: 'managerName',
    },
    {
      title: translate('Manager last name'),
      dataIndex: 'managerSurname',
    },
    {
      title: translate('Email'),
      dataIndex: 'email',
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
