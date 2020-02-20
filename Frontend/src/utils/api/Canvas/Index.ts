import { Axios } from '../Instance'

const sendUpdateToCanvas = (studentId: number) => {
  return Axios.post(`/api/canvas/${studentId}`);
}

const Canvas = { sendUpdateToCanvas }
export default Canvas;
