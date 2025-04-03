import { getCauHinh } from "@/services/Bai_TH4/cauHinh"
import { useState } from "react"

export default () => {
    const [cauHinh,setCauHinh] = useState([])
    const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<CauHinh.Record>();

    const getCauHinhModel = async () => {
        const res = await getCauHinh(); //Lấy danh sách lịch hẹn thức từ api
        const data = res?.data
        setCauHinh(data || [])
    }

    return {
        cauHinh,
        setCauHinh,
        getCauHinhModel,
        visible,
		setVisible,
		row,
		setRow,
		isEdit,
		setIsEdit,
    }
}