import ResourceList from './ResourceList.jsx'

export default function Leaderboard() {
  return (
    <ResourceList
      resource="leaderboard"
      title="Leaderboard"
      description="A live look at the points race."
      columns={[
        { key: 'user', label: 'Athlete' },
        { key: 'team', label: 'Team' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}