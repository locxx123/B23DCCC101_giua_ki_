// import { getData } from '@/services/RandomUser';
import { getNhanVien } from '@/services/QuanLyNhanVien';
import { useState } from 'react';

export default () => {
    const [data, setData] = useState<Nhan_Vien.Record[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<Nhan_Vien.Record>();

    const getDataUser = async () => {
        const res = await getNhanVien();
        if (res?.data) {
            // Sắp xếp dữ liệu theo lương giảm dần
            const sortedData = [...res.data].sort((a, b) => {
                const luongA = parseFloat(a.luong);
                const luongB = parseFloat(b.luong);
                return luongB - luongA;
            });
            setData(sortedData);
        } else {
            setData([]);
        }
    };

    return {
        data,
        visible,
        setVisible,
        row,
        setRow,
        isEdit,
        setIsEdit,
        setData,
        getDataUser,
    };
};
