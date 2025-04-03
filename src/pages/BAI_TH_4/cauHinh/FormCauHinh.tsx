import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useModel } from 'umi';

const FormCauHinh = () => {
    const { cauHinh, getCauHinhModel, row, isEdit, setVisible } = useModel('bai_th_4.cauHinh');

    return (
        <Form
            onFinish={(values) => {
                console.log('🚀 ~ RandomUser ~ values:', values);
                const index = cauHinh.filter((item: any) => {
                    console.log(item.ten_truong);
                    return item.ten_truong === row?.ten_truong;
                });
                const id = index.length > 0 ? index[0].id : undefined;
                if (isEdit) {
                    // Sửa cấu hình
                    axios.put(`http://localhost:3000/cauHinh/${id}`, values)
                        .then(res => {
                            console.log(res.data);
                        })
                        .catch(err => {	
                            console.log(err);
                        })
                } else {
                    // Thêm cấu hình
                    axios.post('http://localhost:3000/cauHinh', values)
                        .then(res => {
                            console.log(res.data);
                        })
                        .catch(err => {	
                            console.log(err);
                        })
                }
                setVisible(false);
                getCauHinhModel();
            }}
        >
            <Form.Item
                initialValue={row?.ten_truong}
                label='Tên trường'
                name='ten_truong'
                rules={[{ required: true, message: 'Please input your ten_truong!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                initialValue={row?.kieu_du_lieu}
                label='Kiểu dữ liệu'
                name='kieu_du_lieu'
                rules={[{ required: true, message: 'Please input your kieu_du_lieu!' }]}
            >
                <Input />
            </Form.Item>

            <div className='form-footer'>
                <Button htmlType='submit' type='primary'>
                    {isEdit ? 'Save' : 'Insert'}
                </Button>
                <Button onClick={() => setVisible(false)}>Cancel</Button>
            </div>
        </Form>
    );
};

export default FormCauHinh;