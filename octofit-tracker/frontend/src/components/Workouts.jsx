import ResourceList from './ResourceList.jsx'

export default function Workouts() {
  return (
    <ResourceList
      resource="workouts"
      title="Workouts"
      description="Find your next session."
      columns={[
        { key: 'title', label: 'Workout' },
        { key: 'description', label: 'Details' },
        { key: 'difficulty', label: 'Difficulty' },
        { key: 'activities', label: 'Activities' },
      ]}
    />
  )
}