import { DashBoard } from 'src/modules';
import { PrivateRoute } from './layout';

export default function Page() {
  return (
    <PrivateRoute>
      <DashBoard />
    </PrivateRoute>
  );
}
