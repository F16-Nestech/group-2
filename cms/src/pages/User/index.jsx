import React from 'react';

import useLanguage from '@/locale/useLanguage';
import CrudModule from '@/modules/CrudModule/CrudModule';
import UserForm from '@/forms/UserForm';
import dayjs from 'dayjs';
export default function User() {
  const translate = useLanguage();
  const entity = 'user';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name,birthday',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['name', 'surname'];

  const dataTableColumns = [
    {
      title: translate('name'),
      dataIndex: 'name',
    },
    {
      title: translate('Birthday'),
      dataIndex: 'birthday',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: translate('Address'),
      dataIndex: 'address',
    },
    {
      title: translate('Phone'),
      dataIndex: 'phone',
    },
    {
      title: translate('Email'),
      dataIndex: 'email',
    },
  ];

  const readColumns = [
    {
      title: translate('first name'),
      dataIndex: 'name',
    },
    {
      title: translate('last name'),
      dataIndex: 'surname',
    },
    {
      title: translate('Birthday'),
      dataIndex: 'birthday',
      isDate: true,
    },
    {
      title: translate('birthplace'),
      dataIndex: 'birthplace',
    },
    {
      title: translate('gender'),
      dataIndex: 'gender',
    },
    {
      title: translate('address'),
      dataIndex: 'address',
    },
    {
      title: translate('Phone'),
      dataIndex: 'phone',
    },
    {
      title: translate('Email'),
      dataIndex: 'email',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('user'),
    DATATABLE_TITLE: translate('user_list'),
    ADD_NEW_ENTITY: translate('add_new_user'),
    ENTITY_NAME: translate('user'),
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
      createForm={<UserForm />}
      updateForm={<UserForm isUpdateForm={true} />}
      config={config}
    />
  );
}
