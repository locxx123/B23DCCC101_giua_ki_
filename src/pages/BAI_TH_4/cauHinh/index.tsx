import { IColumn } from '@/components/Table/typing'
import { Button, Modal, Table } from 'antd';
import React, { useEffect } from 'react'
import { useModel } from 'umi'
import FormCauHinh from './FormCauHinh';

const cauHinh = () => {
    const { cauHinh, getCauHinhModel,setRow, isEdit, setVisible, setIsEdit, visible } = useModel("bai_th_4.cauHinh")

    useEffect(() => {
        getCauHinhModel()
    }, [])

    const columns: IColumn<CauHinh.Record>[] = [
        {
            title: 'Tên trường',
            dataIndex: 'ten_truong',
            width: 100,
            align: 'center',
        },
        {
            title: 'Kiểu dữ liệu',
            dataIndex: 'kieu_du_lieu',
            width: 200,
            align: 'center',

        },
        {
            title: 'Action',
            width: 200,
            align: 'center',
            render: (record) => {
                return (
                    <div>
                        <Button
                        onClick={() => {
                        	setVisible(true);
                        	setRow(record);
                        	setIsEdit(true);
                        }}
                        >
                            Edit
                        </Button>
                        <Button
                            style={{ marginLeft: 10 }}
                            // onClick={() => {
                            // 	const dataLocal: any = JSON.parse(localStorage.getItem('data') as any);
                            // 	const newData = dataLocal.filter((item: any) => item.address !== record.address);
                            // 	localStorage.setItem('data', JSON.stringify(newData));
                            // 	getDataUser();
                            // }}
                            type='primary'
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            <h1>Cấu hình biểu mẫu phụ lục</h1>
            <Button
                type='primary'
                onClick={() => {
                    setVisible(true);
                    setIsEdit(false);
                    setRow(undefined)
                }}
            >
                Thêm cấu hình
            </Button>

            <Table style={{marginTop:20}} dataSource={cauHinh} columns={columns} />

            <Modal
                destroyOnClose
                footer={false}
                title={isEdit ? 'Edit User' : 'Add User'}
                visible={visible}
                onOk={() => { }}
                onCancel={() => {
                    setVisible(false);
                }}
            >
                <FormCauHinh />
            </Modal>
        </div>
    )
}

export default cauHinh