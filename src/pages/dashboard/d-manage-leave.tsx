import React from 'react'
import { withAdminGuard } from '../../hocs/with-admin-guard'

const DManageLeave = () => {
	return (
		<div>
			DManageLeave
		</div>
	)
}

export default withAdminGuard(DManageLeave)

//ป้องกันหน้าไหน เอามา ป้องกัน
