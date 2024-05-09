import { doc, getDoc } from 'firebase/firestore';
import { COLLECTION_TASKS } from 'src/constants';
import { db } from 'src/firebase';
import { TaskDetail } from 'src/modules';

export async function generateMetadata(props: any) {
  const docRef = doc(db, COLLECTION_TASKS, props.params.taskId);
  const task = await getDoc(docRef);
  return {
    title: task.data()?.title,
    description: task.data()?.detail
  };
}

export default TaskDetail;
