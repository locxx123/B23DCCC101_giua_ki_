import { Button, Form, Input, Select } from 'antd';
import { useModel } from 'umi';
import { chuc_vu,phong_ban,trang_thai } from '@/services/QuanLyNhanVien/constant';
import { addNhanVien,editNhanVien } from '@/services/QuanLyNhanVien';
import rules from '@/utils/rules';


const FormNhanVien = () => {
    const { data, getDataUser, row, isEdit, setVisible } = useModel('nhan_vien');
    return (
        <Form
            onFinish={(values) => {
                console.log('🚀 ~ Nhân viên:', values);
                const index = data.findIndex((item: any) => item.id === row?.id);
                const dataTemp: Nhan_Vien.Record[] = [...data];
                dataTemp.splice(index, 1, values);
                const dataLocal = isEdit ? dataTemp : [values, ...data];
                localStorage.setItem('data', JSON.stringify(dataLocal));

                if(!isEdit) {
                    // Insert nhân viên vào database
                    addNhanVien(values).then((res) => {
                        console.log('🚀 ~ res:', res)   
                    });
                }else {
                    // Sửa nhân viên theo id
                    editNhanVien({ id: row?.id, data: values }).then((res) => {
                        console.log('🚀 ~ res:', res)   
                    });
                }
                setVisible(false);
                getDataUser();
            }}
        >
            <Form.Item
                initialValue={row?.ho_va_ten}
                label='Họ và tên'
                name='ho_va_ten'
                rules={rules.ten}
            >
                <Input />
            </Form.Item>

            <Form.Item
                initialValue={row?.chuc_vu}
                label='Chức vụ'
                name='chuc_vu'
                rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}
            >
                <Select>
                    {chuc_vu.map((cv) => (
                        <Select.Option key={cv} value={cv}>{cv}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                initialValue={row?.phong_ban}
                label='Phòng ban'
                name='phong_ban'
                rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
            >
                <Select>
                    {phong_ban.map((pb) => (
                        <Select.Option key={pb} value={pb}>{pb}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                initialValue={row?.luong}
                label='Lương'
                name='luong'
                rules={[{ required: true, message: 'Vui lòng chọn lương!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                initialValue={row?.trang_thai}
                label='Trạng thái'
                name='trang_thai'
                rules={[{ required: true, message: 'Please input your trang_thai!' }]}
            >
                <Select>
                    {trang_thai.map((tt) => (
                        <Select.Option key={tt} value={tt}>{tt}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <div className='form-footer'>
                <Button htmlType='submit' type='primary'>
                    {isEdit ? 'Lưu' : 'Thêm nhân viên'}
                </Button>
                <Button onClick={() => setVisible(false)}>Cancel</Button>
            </div>
        </Form>
    );
};

export default FormNhanVien;
