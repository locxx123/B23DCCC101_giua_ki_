import { useEffect, useState } from 'react';
import FormNhanVien from './FormNhanVien';
import type { IColumn } from '@/components/Table/typing';
import { Button, Modal, Table, Input } from 'antd';
import { useModel } from 'umi';
import { deleteNhanVien } from '@/services/QuanLyNhanVien';

const QuanLyNhanVien = () => {
    const { data, getDataUser, setRow, isEdit, setVisible, setIsEdit, visible } = useModel('nhan_vien');
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState<Nhan_Vien.Record[]>([]);

    useEffect(() => {
        getDataUser();
    }, []);

    useEffect(() => {
        setFilteredData(
            data.filter((item: Nhan_Vien.Record) => 
                item.ma_nhan_vien.toLowerCase().includes(searchText.toLowerCase()) ||
                item.ho_va_ten.toLowerCase().includes(searchText.toLowerCase()) ||
                item.chuc_vu.toLowerCase().includes(searchText.toLowerCase()) ||
                item.phong_ban.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [searchText, data]);

    const columns: IColumn<Nhan_Vien.Record>[] = [
        {
            title: 'Mã nhân viên',
            dataIndex: 'ma_nhan_vien',
            key: 'ma_nhan_vien',
            align: 'center',
            width: 200,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'ho_va_ten',
            key: 'ho_va_ten',
            align: 'center',
            width: 100,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'chuc_vu',
            key: 'chuc_vu',
            align: 'center',
            width: 100,
        },
        {
            title: 'Phòng ban',
            dataIndex: 'phong_ban',
            key: 'phong_ban',
            align: 'center',
            width: 100,
        },
        {
            title: 'Lương',
            dataIndex: 'luong',
            key: 'luong',
            align: 'center',
            width: 100,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trang_thai',
            key: 'trang_thai',
            align: 'center',
            width: 100,
        },
        {
            title: 'Hành động',
            width: 200,
            align: 'center',
            render: (record) => (
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
                        onClick={() => {
                            if (record.trang_thai === 'Thử việc' || record.trang_thai === 'Đã thôi việc') {
                                deleteNhanVien(record?.ma_nhan_vien).then(() => {
                                    getDataUser();
                                });
                            } else {
                                alert('Nhân viên này đang làm việc không thể xóa!');
                            }
                        }}
                        type='primary'
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Input
                placeholder='Tìm kiếm theo mã nhân viên hoặc tên'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300, marginBottom: 20 }}
            />
            <Button
                type='primary'
                onClick={() => {
                    setVisible(true);
                    setIsEdit(false);
                }}
                style={{ marginLeft: 10 }}
            >
                Thêm nhân viên
            </Button>
            
            <Table
                style={{ marginTop: 20 }}
                dataSource={filteredData}
                columns={columns}
                rowKey="ma_nhan_vien"
            />
            
            <Modal
                destroyOnClose
                footer={false}
                title={isEdit ? 'Lưu' : 'Thêm nhân viên'}
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <FormNhanVien />
            </Modal>
        </div>
    );
}

export default QuanLyNhanVien;