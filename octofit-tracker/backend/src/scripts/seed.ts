import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.create([
      { name: 'Trailblazers', points: 420 },
      { name: 'Pulse Squad', points: 365 },
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya@example.com', team: teams[0]._id, points: 230 },
      { name: 'Jordan Lee', email: 'jordan@example.com', team: teams[0]._id, points: 190 },
      { name: 'Sam Rivera', email: 'sam@example.com', team: teams[1]._id, points: 205 },
      { name: 'Alex Morgan', email: 'alex@example.com', team: teams[1]._id, points: 160 },
    ]);

    await Promise.all([
      Team.updateOne(
        { _id: teams[0]._id },
        { $set: { members: [users[0]._id, users[1]._id] } },
      ),
      Team.updateOne(
        { _id: teams[1]._id },
        { $set: { members: [users[2]._id, users[3]._id] } },
      ),
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Running', duration: 35, distance: 5.2, points: 80 },
      { user: users[1]._id, type: 'Cycling', duration: 50, distance: 18, points: 95 },
      { user: users[2]._id, type: 'Swimming', duration: 40, distance: 1.5, points: 85 },
      { user: users[3]._id, type: 'Strength training', duration: 45, points: 70 },
    ]);

    await LeaderboardEntry.create([
      { user: users[0]._id, team: teams[0]._id, points: 230 },
      { user: users[1]._id, team: teams[0]._id, points: 190 },
      { user: users[2]._id, team: teams[1]._id, points: 205 },
      { user: users[3]._id, team: teams[1]._id, points: 160 },
      { team: teams[0]._id, points: 420 },
      { team: teams[1]._id, points: 365 },
    ]);

    await Workout.create([
      {
        title: 'Easy Morning Run',
        description: 'A relaxed pace-building run with a short warm-up and cool-down.',
        difficulty: 'beginner',
        activities: ['Running', 'Mobility'],
      },
      {
        title: 'Tempo Ride',
        description: 'Steady cycling intervals to build aerobic endurance.',
        difficulty: 'intermediate',
        activities: ['Cycling'],
      },
      {
        title: 'Full-body Strength',
        description: 'A balanced strength session using compound movements.',
        difficulty: 'advanced',
        activities: ['Strength training'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
