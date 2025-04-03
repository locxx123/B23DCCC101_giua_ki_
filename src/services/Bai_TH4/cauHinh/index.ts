import axios from 'axios';

export const getCauHinh = async () => {
    const res = await axios.get('http://localhost:3000/cauHinh');
    return res;
};