import AdminGuard from '../guards/admin-guard';

export const withAdminGuard = (Component: any) => (props: any) =>
  (
    <AdminGuard>
      <Component {...props} />
    </AdminGuard>
  );
