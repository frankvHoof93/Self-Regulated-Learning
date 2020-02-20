import { Axios } from '../Instance'

const get = (studentId: number) => {
  return Axios.get(`/api/Feedback/${studentId}`);
}

const Feedback = { get }
export default Feedback;
