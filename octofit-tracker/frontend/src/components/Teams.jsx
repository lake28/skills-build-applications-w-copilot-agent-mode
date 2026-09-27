import ResourceList from './ResourceList.jsx'

export default function Teams() {
  return (
    <ResourceList
      resource="teams"
      title="Teams"
      description="Crews building momentum together."
      columns={[
        { key: 'name', label: 'Team' },
        { key: 'members', label: 'Members' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}