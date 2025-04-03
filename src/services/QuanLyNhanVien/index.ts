import axios from 'axios';

export const getNhanVien = async () => {
	const res = await axios.get('http://localhost:3000/nhan_vien');
	return res;
};

export const addNhanVien = async ( data: Nhan_Vien.Record) => {
	const res = await axios.post('http://localhost:3000/nhan_vien',data);
	return res;
};

interface EditNhanVien {
	id: string | undefined;
	data: Nhan_Vien.Record;
}
export const editNhanVien = async ({ id, data }: EditNhanVien) => {
	const res = await axios.put(`http://localhost:3000/nhan_vien/${id}`, data);
	return res;
};

export const deleteNhanVien = async ( id : string | undefined) => {
	const res = await axios.patch(`http://localhost:3000/nhan_vien/${id}`);
	return res;
};