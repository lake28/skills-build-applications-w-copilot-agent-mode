import ResourceList from './ResourceList.jsx'

export default function Users() {
  return (
    <ResourceList
      resource="users"
      title="Athletes"
      description="People making time to move."
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'team', label: 'Team' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}