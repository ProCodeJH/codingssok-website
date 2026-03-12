'use client'

import dynamic from 'next/dynamic'

const ParentDashboard = dynamic(() => import('./ParentDashboard'), { ssr: false })

export default function ParentPage() {
    return <ParentDashboard />
}
