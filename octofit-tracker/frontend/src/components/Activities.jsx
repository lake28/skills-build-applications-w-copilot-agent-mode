import ResourceList from './ResourceList.jsx'

export default function Activities() {
  return (
    <ResourceList
      resource="activities"
      title="Activities"
      description="Recent movement logged by the OctoFit community."
      columns={[
        { key: 'type', label: 'Activity' },
        { key: 'user', label: 'Athlete' },
        { key: 'duration', label: 'Duration (min)' },
        { key: 'distance', label: 'Distance' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}